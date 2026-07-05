"use client"

import { Appbar } from "@repo/ui/AppBar";

export default function Home() {
  return (
   <>
   <Appbar onSignin="onSing" onSignout="onsingout" key="3"/>
   </>
  );
}
