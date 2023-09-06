import mongoose from "mongoose";
const RegisterSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    image:String
})
if( mongoose.models["RegisterUsers"]){
    delete  mongoose.models["RegisterUsers"]

}
export const RegisterModel = mongoose.model('RegisterUsers', RegisterSchema)