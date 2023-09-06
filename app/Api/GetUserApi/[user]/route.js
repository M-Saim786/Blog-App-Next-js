import { RegisterModel } from "@/app/Lib/Models/RegisterModel"
import { ConnectUrl } from "@/app/Lib/db"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function PUT(request, content) {
    let data = await request.json()
    let id = content.params.user
    const ID = { _id: id }
    await mongoose.connect(ConnectUrl)
        .then(() => {
            console.log("Connected")
        })
    let dataForPUT = await RegisterModel.findOneAndUpdate(ID, data)
    return NextResponse.json({
        data: dataForPUT,
        status: true,
        message: 'updated'
    })
}