import { FilterQuery } from 'mongoose'
import Session, { SessionDocument } from '../models/session'

//  Create user session from the database
export async function create_user_session(user_id: string, user_agent: string) {
    const session = await Session
        .create({user_id, user_agent})
    
    return session.toJSON()
}
//  Gets the user session by accessing the Session Document in our database
export async function get_user_session(query: FilterQuery<SessionDocument>) { 
    const user_session = await Session
        .find(query)
        .lean();
    return user_session 
}