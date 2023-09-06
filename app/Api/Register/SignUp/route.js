import { RegisterModel } from "@/app/Lib/Models/RegisterModel";
import { ConnectUrl } from "@/app/Lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request, content) {
    let data = await request.json()
    await mongoose.connect(ConnectUrl).then(() => {
        console.log('connected')
    })
    console.log(data)
    let checkUser = await RegisterModel.findOne({ email: data.email })
    console.log(checkUser)
    if (checkUser !== null) {
        return NextResponse.json({
            message: 'Already Register',
            status: false,
            // data: checkUser
        })
    }
    else {
        let Register = await RegisterModel(data)
        let res = await Register.save()
        return NextResponse.json({
            data: res,
            message: 'Registered'
        })
    }

}