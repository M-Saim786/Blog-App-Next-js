import { NoteModel } from "@/app/Lib/Models/Note";
import { ConnectUrl } from "@/app/Lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request, content) {
    let note = await request.json()
    await mongoose.connect(ConnectUrl).then(() => {
        console.log('connected Note')
    })
    if (note.title === '') {
        return NextResponse.json({
            message: "Note Title could'nt be null",
            status: false
        })
    }
    else {
        let myNote = NoteModel(note)
        let data = myNote.save()
        return NextResponse.json({
            data: myNote,
            message: 'Note Added',
            status: true
        })
    }
}


export async function GET() {
    // console.log(process.env.Mongodb_Url)
    // await mongoose.connect(process.env.Mongodb_URI).then(() => {
    //     console.log('Connected')
    // })
    await mongoose.connect(ConnectUrl).then(() => {
        console.log('connected')
    })
    let data = await NoteModel.find()
    return NextResponse.json({
        data: data,
        status: true
    })
}