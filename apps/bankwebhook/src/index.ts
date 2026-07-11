import express, { Request, Response } from "express"
import {prisma} from "@repo/db"
const app=express();

app.use(express.json());


app.post("/hdfcbank",async(req:Request,res:Response)=>{
  const paymentInformation:{
    token:string,
    userId:number,
    amount:number
  }={
    token:req.body.token,
    userId:Number(req.body.user_identifier),
    amount:Number(req.body.amount)
  };
console.log("Parsed Payment Information:", paymentInformation);
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
    ],{
      timeout:15000
    });
    return  res.json({
    message: "Captured"
  })

  }catch(e){
    console.error(e);
   return res.status(411).json({
      message:"Error while processing webhook"
        })
  }
 



})

app.listen(3004,()=>{
  console.log("server is listen on port 3004")
});