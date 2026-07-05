"use client"
import {useBalance} from "@repo/store"
import { Appbar } from "@repo/ui/AppBar";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const balance = useBalance((state)=>state.balance);
  const session=useSession() ;
  return (
   <div>
          <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user}/>

    </div>
  );
}
