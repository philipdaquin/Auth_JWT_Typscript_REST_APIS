import { get } from 'lodash'
import { Request, Response, NextFunction} from 'express'
import { verify_jwt} from '../jwt'

const deserialize_user = (request: Request, response: Response, next: NextFunction) => { 
    const access_token = get(request, "headers.authorization").replace(/^Bearer\s/, "")

    if (!access_token) return next()
    const {decoded, expired} = verify_jwt(access_token);

    if (decoded) { 
        //  Attach the current user to the locals
        response.locals.user = decoded;
        return next()
    }
    
}