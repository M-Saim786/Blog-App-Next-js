import mongoose from "mongoose"
const NoteSchema = mongoose.Schema({
    title: String,
    desc: String,
    userId:String

})
if (mongoose.models['Notes']) {
    delete mongoose.models['Notes']
}
export const NoteModel = mongoose.model('Notes', NoteSchema)