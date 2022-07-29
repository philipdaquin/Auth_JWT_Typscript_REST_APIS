import { isNumberObject } from 'util/types'
import {object, number, string, TypeOf} from 'zod'


const payload =  { 
    body: object({
        name: string({required_error: 'Needs a Title'}),
        description: string({required_error: 'Needs a description'})
            .min(300, "Min length is 300 chars"), 
        price: number({required_error: 'Needs a Price'}), 
        image: string({required_error: 'Needs a image url'})
    })
}   

const params = { 
    params: object({
        product_id: string({required_error: "Product Id is required"})
    })
}

export const createProductSchema = object({
    ...payload
});

export const updateProductSchema = object({
    ...payload,
    ...params
});


export const deleteProductSchema = object({
    ...params
});

export const getProductSchema = object({
    ...params
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
export type GetProductInput = TypeOf<typeof getProductSchema>;

