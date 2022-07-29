import mongoose  from "mongoose";
import {customAlphabet} from 'nanoid'
import UserType, { UserModel }  from './user_model'


const nano_id = customAlphabet('abcdefghijklmnopqrstuvwxyz12345678910', 7);

export interface ProductInput {
    user_id: UserModel['_id'],
    name: string, 
    description: string, 
    price: number, 
    image: string,
}

export interface ProductModel extends ProductInput, mongoose.Document { 
    created_at: string, 
    updated_at: string
}

const products_schema = new mongoose.Schema({
    product_id: {
        type: String, 
        required: true, 
        unique: true, 
        default: () => `product_${nano_id()}` 
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: {type: String, required: true},
    description: {type: String, required: false},
    price: {type: String, required: true},
    image: {type: String, required: true}
}, 
    {
    timestamps: true
    }
);
const Product = mongoose.model<ProductModel>("Product", products_schema);
export default Product 