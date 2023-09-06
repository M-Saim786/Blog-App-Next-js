import { BlogModel } from "@/app/Lib/Models/BlogModel";
import { ConnectUrl } from "@/app/Lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request, content) {
    let blog = await request.json()
    await mongoose.connect(ConnectUrl).then(() => {
        console.log('Connected')
    })
    if (blog.title !== '' && blog.desc !== '') {
        let data = BlogModel(blog)
        let res = data.save()
        return NextResponse.json({
            data: data,
            status: true,
        })
    }
    else {
        return NextResponse.json({
            data: '',
            status: false,
            message:'Title and Description not be Null'
        })
    }
}

export async function GET() {
    await mongoose.connect(ConnectUrl).then(() => {
        console.log("Connected")
    })
    let data = await BlogModel.find()
    return NextResponse.json({
        data: data,
        status: true
    })
}