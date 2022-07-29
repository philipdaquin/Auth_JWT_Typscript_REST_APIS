import { FilterQuery, UpdateQuery } from 'mongoose'
import Session, { SessionDocument } from '../models/session'
import { verify_jwt } from '../jwt'
import {get} from 'lodash'
import { get_user } from '../service/user_service';
import config from 'config'
import {signing_jwt} from '../jwt'

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

export async function update_session(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) { 
    return Session.updateOne(query, update)
}

export async function re_issue_access_token({refresh_token}: {refresh_token: string} ) {
    const { decoded } = verify_jwt(refresh_token);

    if (!decoded || !get(decoded, 'session' )) return false
    
    const session = await Session.findById(get(decoded, "session"))

    //  If the session is already valid
    if (!session || !session.valid) return false;

    //  Get the user information 
    const user = await get_user({ _id: session.user_id })

    // User Not found, return false
    if (!user) return false 

    // Else, Create an access token 
    const access_token = signing_jwt(
        {...user, session: session.user_id },
        {
            //  15 mins
            expiresIn: config.get<string>('accessTokenTtl')
        }
    );
    return access_token

}