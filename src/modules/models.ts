import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import config from 'config'

export interface UserModel extends mongoose.Document { 
    name: string, 
    email: string, 
    username: string, 
    age: number, 
    hash: string 
    created_at: Date,
    updated_at: Date,
}

// Schema Definition to our Database
const userSchema = new mongoose.Schema({
    name:   {type: String, required: true, unique: true},
    email:  {type: String, required: false, unique: true},
    age:    {type: Number, required: false, unique: false},
    hash:   {type: String, required: true}
}, { 
    timestamps: true
})
//  Pre Middleware functions are executed one after another, when each middleware calls next
userSchema.pre("save", async function(next) { 
    let user = this as UserModel
    let saltRounds = config.get<number>('saltWorkFactor')

    if (!user.isModified('hash')) { 
        return next();
    }
    
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hashSync(user.hash, salt)
    
    user.hash = hash;
    return next();
})


userSchema.methods.comparePassword = async function(candidatePassword: string) {}

const UserType = mongoose.model("User", userSchema)