import { BlogModel } from "@/app/Lib/Models/BlogModel";
import { ConnectUrl } from "@/app/Lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    await mongoose.connect(ConnectUrl).then(() => {
        console.log("Connected")
    })
    let searchKey = content.params.search.toLowerCase()
    let dataArr = []
    let data = await BlogModel.find()
    for (const i of data) {
        console.log(i.title)
        console.log(i.title.toLowerCase().includes())
        if (i.title.toLowerCase().includes(searchKey)) {
            console.log(i.title)
            dataArr.push(i)
        }
    }
    return NextResponse.json({
        data: dataArr,
        status: true
    })
}