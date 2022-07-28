import mongoose from "mongoose";
import config from 'config'
import { UserModel } from "./user_model";


export interface SessionDocument extends mongoose.Document { 
    user_id: UserModel['_id'],
    valid: boolean,
    user_agent: string,
    created_at: Date,
    updated_at: Date
}

const session_schema = new mongoose.Schema( { 
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valid: {type: Boolean, default: true},
    user_agent: {type: String}
})

const Session = mongoose.model("Session", session_schema);
export default Session