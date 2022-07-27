import { Request, Response, NextFunction} from 'express'
import {AnyZodObject} from 'zod'

const validate_response = (schema: AnyZodObject) => (
    request: Request,
    response: Response, 
    next: NextFunction 
    ) => { 
        try { 
            schema.parse({
                body: request.body, 
                query: request.query,
                params: request.params
            });
            next();
        } catch (error) { 
            return response
                .status(400)
                .send(error)
        }
    }

export default validate_response