import { NoteModel } from "@/app/Lib/Models/Note"
import { ConnectUrl } from "@/app/Lib/db"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function PUT(request, content) {
    let note = await request.json()
    console.log(note)
    let id =  content.params.Id
    console.log(id)
    // id = id.json()
    const ID = { _id: id }
    await mongoose.connect(ConnectUrl).then(() => {
        console.log("connected")
    })
    let dataForPut = await NoteModel.findOneAndUpdate(ID, note)
    return NextResponse.json({
        data: dataForPut,
        status: true
    })
    // let res = await data.fin
}