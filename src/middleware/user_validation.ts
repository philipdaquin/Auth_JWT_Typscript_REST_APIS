import { get } from 'lodash'
import { Request, Response, NextFunction} from 'express'
import { verify_jwt} from '../jwt'
import { re_issue_access_token } from '../service/session_service'

export  const deserialize_user = async (request: Request, response: Response, next: NextFunction) => { 
    const access_token = get(request, "headers.authorization").replace(/^Bearer\s/, "")
    const refresh_token = get(request, "header.x-refresh")
    
    if (!access_token) return next()
    const {decoded, expired} = verify_jwt(access_token);
    console.log(decoded)
    
    if (decoded) { 
        //  Attach the current user to the locals
        response.locals.user = decoded;
        return next()
    }

    if (expired && refresh_token) { 
        const new_access_token = await re_issue_access_token({refresh_token});
        if (new_access_token) return response.setHeader('x-access-token', new_access_token)
        const result = verify_jwt(new_access_token as string)

        response.locals.user = result.decoded

        return next()
    }
    return next()
    
}

