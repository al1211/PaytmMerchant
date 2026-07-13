"use server"


import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { prisma } from "@repo/db";




export async function p2pTransaction(to:string,amount:number){
    const session =await getServerSession(authOptions);
    const userId=session?.user?.id;
    if(!userId){
        return {
            message:"User not logged in"
        }
    }
    const toUser=await prisma.user.findFirst({
        where:{
            number:to
        }
    })
       if(!toUser){
        return {
            message:"User not found"
        }
       }
    await prisma.$transaction(async(tx)=>{
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${Number(userId)} FOR UPDATE`
        const fromBalance=await tx.balance.findUnique({
            where:{userId:Number(userId)}
        });
         
        if(!fromBalance || fromBalance.amount <amount){
            throw new Error("Insufficient funds");
        };

        await tx.balance.update({
            where:{userId:Number(userId)},
            data:{amount:{decrement:amount}}
        });

        await tx.balance.update({
            where:{userId:toUser.id},
            data:{amount:{increment:amount}}
        })
        
        await tx.p2pTransfer.create({
            data:{
                fromUserId:Number(userId),
                toUserId:toUser.id,
                amount,
                timestamp:new Date()
            }
        })
    })
}