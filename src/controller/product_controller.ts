import {Response, Request} from 'express'
import { CreateProductInput, DeleteProductInput, GetProductInput, UpdateProductInput } from '../schema/product_schema';
import { create_new_product } from '../service/product_service';

export async function create_product_handler(
    request: Request<{}, {}, CreateProductInput["body"]>,
    response: Response
) {
    let user_id = response.locals.user._id 
    let body = request.body

    let post = await create_new_product({
        ...body, user_id,
        name: ''
    })
}

export async function update_product_handler(
    request: Request<UpdateProductInput["params"]>,
    response: Response
) {}
export async function get_product_handler(
    request: Request<GetProductInput["params"]>,
    response: Response
) {}
export async function delete_product_handler(
    request: Request<DeleteProductInput["params"]>,
    response: Response
) {}