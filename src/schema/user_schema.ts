import {object, string, boolean, number, TypeOf} from 'zod'

export const createUserSchema = object({
    body: object({ 
        name: string({ required_error: 'Name is required'}),
        email: string({ required_error: 'Email is required'}).email('Not a valid email'),
        username: string({ required_error: 'Username is required'}),
        age: number({required_error:  'Required Age'}),
        hash:  string({ required_error: 'Name is required'}).min(6, 'Password too short - min 6 chars'),
        passwordResponse: string({ required_error: 'Name is required'}),
        
    }).refine((data) => data.hash === data.passwordResponse, { 
        message: "Password do not match",
        path: ["passwordResponse"]
    })
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordResponse">