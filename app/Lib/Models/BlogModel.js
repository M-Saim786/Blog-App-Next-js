import { Timestamp } from "mongodb";
import mongoose from "mongoose";
const BlogSchema = mongoose.Schema({
    title: String,
    desc: String,
    userId: String,
    blogImg: String,

}, { timestamps: true })

if (mongoose.models['Blogs']) {
    delete mongoose.models['Blogs']
}

export const BlogModel = mongoose.model("Blogs", BlogSchema)