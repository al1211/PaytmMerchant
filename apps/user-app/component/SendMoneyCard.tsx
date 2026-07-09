"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/Card";
import { Select } from "@repo/ui/Select";
import { useState } from "react";
import { TextInput } from "@repo/ui/TextInput";
import { createOnRamptransaction } from "../app/lib/actions/createOnRamptns";



export const SendMoney = () => {
    const [amount,setAmount]=useState("");
    const [number,setNumber]=useState("");
    return <Card title="Add Money">
    <div className="w-full">
        <TextInput  label={"Number"} placeholder={"93884849893"} onChange={(value) => {
                  setNumber(value)
        }} />
        <TextInput  label={"Amount"} placeholder={"Amount"} onChange={(value) => {
                  setAmount(value)
        }} />
        
        <div className="flex justify-center pt-4">
            <Button onClick={async() => {
              
            }}>
            Send
            </Button>
        </div>
    </div>
</Card>
}