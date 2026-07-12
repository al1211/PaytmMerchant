import express, { Request, Response } from "express"
import {prisma} from "@repo/db"
const app=express();

app.use(express.json());

console.log("serverUrl",process.env.DATABASE_URL);
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
  try {
  // Interactive transaction function syntax use karein
  await prisma.$transaction(async (tx) => {
    
    // 1. Balance update karein (yahan 'tx' variable use hoga, 'prisma' nahi)
    await tx.balance.updateMany({
      where: {
        userId: Number(paymentInformation.userId)
      },
      data: {
        amount: {
          increment: Number(paymentInformation.amount)
        }
      }
    });

    // 2. Transaction status update karein
    await tx.onRampTransaction.updateMany({
      where: {
        token: paymentInformation.token
      },
      data: {
        status: "Success"
      }
    });

  }, {
    maxWait:10000,
    timeout: 15000 // 15 seconds ka timeout bilkul theek hai
  });

  return res.json({
    message: "Captured"
  });

} catch (e) {
  console.error(e);
  return res.status(411).json({
    message: "Error while processing webhook"
  });
}
 



})

app.listen(3004,()=>{
  console.log("server is listen on port 3004")
});