import express, { Request, Response } from "express"
import {prisma} from "@repo/db"
const app=express();


app.post("/hdfcbank",async(req:Request,res:Response)=>{
  const paymentInformation:{
    token:string,
    userId:string,
    amount:string
  }={
    token:req.body.token,
    userId:req.body.user_identifier,
    amount:req.body.amount
  };
  try{
    
    await prisma.$transaction([

       prisma.balance.updateMany({
        where:{
          userId:Number(paymentInformation.userId)
        },
        data:{
          amount:{
            increment:Number(paymentInformation.amount)
          }
        }
      }),
       prisma.onRampTransaction.updateMany({
        where:{
          token:paymentInformation.token
        },
        data:{
          status:"Success"
        }
      })
    ]);

  }catch(e){
    console.error(e);
    res.status(411).json({
      message:"Error while processing webhook"
        })
  }
 

        res.json({
            message: "Captured"
        })

})

app.listen(3003);