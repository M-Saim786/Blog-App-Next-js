import { RegisterModel } from "@/app/Lib/Models/RegisterModel"
import { ConnectUrl } from "@/app/Lib/db"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(request, content) {
    let body = await request.json()
    // let ID = content.params.login
    console.log(body)
    await mongoose.connect(ConnectUrl).then(() => {
        console.log("connected")
    })
    if (body.email  === '' || body.password === '') {
        return NextResponse.json({
            data: [],
            message: "Email and Passwor can't be null", 
            status:false
        })
    }
    else {
        let findUser = await RegisterModel.findOne({ email: body.email })
        console.log(findUser)
        if (findUser != null) {
            if (body.password === findUser.password) {
                return NextResponse.json({
                    data: findUser,
                    message: 'Login',
                    status: true
                })
            }
            else {
                return NextResponse.json({
                    data: 'Incorrect Password',
                    message: 'Login False',
                    status:false
                })

            }
        }
        else {
            return NextResponse.json({
                data: 'Login Error',
                message: 'Not Found User',
                status:false
            })
        }
    }
}
