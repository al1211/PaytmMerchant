"use client"
import {useBalance} from "@repo/store"

export default function Home() {
  const balance = useBalance((state)=>state.balance);
  return (
   <div>
        hi there {balance}
    </div>
  );
}
