import { Express, Request, Response } from "express";
import { get_session_handler, create_user_session_handler } from "./controller/session_controller";
import { register_user } from "./controller/user_controller";
import validate_response from "./middleware/validate_response";
import { createUserSchema } from "./schema/user_schema";
import { create_user_session, get_user_session } from "./service/session_service";
import { createSessionSchema } from './schema/session_schema'


export default function app_route(app: Express) {
    
    app.get('/', (request: Request, response: Response) => { 
        response.send('Hello WOrld!');
        response.sendStatus(200)
    });

    // app.post('/api/register', (request: Request, response: Response) =>  {
    //     response.send(register_user(request, response))
    // })
    app.post('/api/register_user', validate_response(createUserSchema), register_user)
    app.post('/api/create_session', validate_response(createSessionSchema), create_user_session_handler)
    app.get('/api/session', get_session_handler)
}
