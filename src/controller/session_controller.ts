import {Request, Response} from 'express'
import { omit } from 'lodash';
import { signing_jwt } from '../jwt';
import UserType from '../models/user_model'
import { create_user_session, get_user_session, update_session } from '../service/session_service';
import config from 'config'


//  Create User Session Handler 
export async function create_user_session_handler(request: Request, response: Response) {

    // Validate the user's password
    const user = await validate_password(request.body)
    if (!user) return response
        .sendStatus(409)
        .send("Invalid email or password");
    // Create a session
    const session = await create_user_session(user._id, request.get("user-agent") || "")     

    // Create an access token 
    const access_token = signing_jwt(
        {...user, session: session.user_id },
        {
            //  15 mins
            expiresIn: config.get<string>('accessTokenTtl')
        }
    );
    // Create a refresh token 
    const refresh_token = signing_jwt(
        {...user, session: session.user_id},
        {expiresIn: config.get<string>('refreshTokenTtl')}
    );
    //  Return Access and refresh tokens k
    return response.send({
        access_token, 
        refresh_token
    })
}   

export async function get_session_handler(request: Request, response: Response) { 
    const user_id = response.locals.user._id;
    const session = await get_user_session({user: user_id, valid: true});

    //  Return session
    return response.send(session)
}


export async function validate_password({email , password}: {email: string, password: string}) {
    let user = await UserType.findOne({email})

    if (!user) return false;

    const is_valid = await user.comparePassword(password);
     
    if (!is_valid) return false
    return omit(user.toJSON(), "password")
}


export async function delete_session(request: Request, response: Response) { 
    let session_id = response.locals.user.session;
    
    await update_session({_id: session_id}, {valid: false});
    
    return response.send({
        access_token: null,
        refresh_token: null 
    })

}