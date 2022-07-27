import { Express, Request, Response } from "express";
import { register_user } from "./controller/user_controller";
import validate_response from "./middleware/validate_response";
import { createUserSchema } from "./schema/user_schema";

export default function app_route(app: Express) {
    
    app.get('/', (request: Request, response: Response) => { 
        response.send('Hello WOrld!');
        response.sendStatus(200)
    });

    // app.post('/api/register', (request: Request, response: Response) =>  {
    //     response.send(register_user(request, response))
    // })
    app.post('/api/register_user', validate_response(createUserSchema), register_user)
}
