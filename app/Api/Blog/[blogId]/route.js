import { BlogModel } from "@/app/Lib/Models/BlogModel";
import { ConnectUrl } from "@/app/Lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request, content) {
    let blog = await request.json()
    let id = content.params.blogId
    console.log(id)
    const ID = { _id: id }
    console.log(ID)
    await mongoose.connect(ConnectUrl).then(() => {
        console.log('connected')
    })

    let dataForPut = await BlogModel.findOneAndUpdate(ID, blog)
    return NextResponse.json({
        data: dataForPut,
        status: true,
        message: 'Updated'
    })
}

export async function DELETE(request, content) {
    let id = await content.params.blogId
    const ID = { _id: id }
    await mongoose.connect(ConnectUrl)
        .then(() => {
            console.log("Connected")
        })
    let deleteData = await BlogModel.deleteOne(ID)
    return NextResponse.json({
        data: deleteData,
        status: true,
        message: 'deleted'
    })
}

