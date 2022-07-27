import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import config from 'config'

export interface UserInput { 
    name: string, 
    email: string, 
    username: string, 
    age: number,
    hash: string
}

export interface UserModel extends UserInput, mongoose.Document { 
    created_at: Date,
    updated_at: Date,
    comparePassword(password_input: string): Promise<boolean>
}

// Schema Definition to our Database
const userSchema = new mongoose.Schema({
    name:   {type: String, required: true, unique: true},
    email:  {type: String, required: false, unique: true},
    username:  {type: String, required: false, unique: true},
    age:    {type: Number, required: false, unique: false},
    hash:   {type: String, required: true},
}, { 
    timestamps: true
})
//  Pre Middleware functions are executed one after another, when each middleware calls next
userSchema.pre("save", async function(next) { 
    let user = this as UserModel
    let saltRounds = config.get<number>('saltWorkFactor')
    //  If not modified
    if (!user.isModified('hash')) { 
        return next();
    }
    
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hashSync(user.hash, salt)
    
    user.hash = hash;
    return next();
})
//  Validate the Password
userSchema.methods.comparePassword = async function(password_input: string): Promise<boolean> {
    const user: UserModel = this as UserModel;
    //  Compare db stored hash with user password
    return bcrypt.compare(password_input, user.hash)
        .then((_) => true)
        .catch((e) => false)
}

const UserType = mongoose.model<UserModel>("User", userSchema)
export default UserType
