import mongoose from "mongoose";
const ProductSchema  = mongoose.Schema({
    Product:String
})
export const ProductModel = mongoose.model('products',ProductSchema)