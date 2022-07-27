import { Express, Request, Response } from "express";

export default function app_route(app: Express) {
    
    app.get('/', (request: Request, response: Response) => { 
        response.send('Hello WOrld!');
        response.sendStatus(200)
    })
}
