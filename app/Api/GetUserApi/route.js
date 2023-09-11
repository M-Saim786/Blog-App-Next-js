
import { RegisterModel } from "@/app/Lib/Models/RegisterModel"
import { ConnectUrl } from "@/app/Lib/db"
import mongoose from "mongoose"
import { NextResponse } from "next/server"
export async function GET() {
    await mongoose.connect(ConnectUrl).then(() => {
        console.log("connected")
    })
    let data = await RegisterModel.find()
    return NextResponse.json({
        data: data,
        status: true
    })
}