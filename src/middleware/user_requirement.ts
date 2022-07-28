import { Request, Response, NextFunction} from "express"

//  Check if the user exists
export const require_user = (request: Request, response: Response, next: NextFunction) => { 
    let user = response.locals.user ;
    if (!user) return response
        .sendStatus(403)
        .send("Something went wrong")

    return next()
}