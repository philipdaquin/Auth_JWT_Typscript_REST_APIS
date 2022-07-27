import {Request, Response} from 'express'
import log from '../log'
import { CreateUserInput } from '../schema/user_schema'
import { create_user } from '../service/user_service'

export async function register_user(
    request: Request<{}, {}, CreateUserInput["body"]>, 
    response: Response
) {
    try {
        //  Call DB function for creating a new user 
        const user = await create_user(request.body)
        return user.send(user)
    } catch (error) {
        log.error(error)
        return response.sendStatus(409).send(error)
    }
}