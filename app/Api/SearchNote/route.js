import { BlogModel } from "@/app/Lib/Models/BlogModel";
import { NoteModel } from "@/app/Lib/Models/Note";
import { ConnectUrl } from "@/app/Lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";



// export async function GET() {

// }

export async function POST(request, content) {

    let title = await request.json()
    console.log(title)
  
    // let dataSearch = JSON.stringify(title)
    // const dataSearch = { title: given }
    await mongoose.connect(ConnectUrl).then(() => {
        console.log('Connected')
    })
    // text = text
    // console.log(title)
    let data = await BlogModel.find(title)
    return NextResponse.json({
        data: data,
        status: true
    })
    // let res = data.find
    // for (const i of object) {

    // }

}