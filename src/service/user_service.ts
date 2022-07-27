import mongoose, { DocumentDefinition } from "mongoose";
import UserType, { UserInput, UserModel } from "../models/user_model";
import { omit } from "lodash";

export async function create_user(user_input: UserInput) {
    try { 
        let user = await UserType.create(user_input)
        return omit(user.toJSON(), "password", "created_at")
    } catch(error: any) {
        throw new Error(error)
    }
}