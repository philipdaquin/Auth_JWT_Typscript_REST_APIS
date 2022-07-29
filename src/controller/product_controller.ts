import {Response, Request} from 'express'
import { CreateProductInput, DeleteProductInput, GetProductInput, UpdateProductInput } from '../schema/product_schema';
import { create_new_product, delete_product, get_product, update_product } from '../service/product_service';

export async function create_product_handler(
    request: Request<{}, {}, CreateProductInput["body"]>,
    response: Response
) {
    const user_id = response.locals.user._id 
    const body = request.body

    const post = await create_new_product({
        ...body, user_id
    })
}

export async function update_product_handler(
    request: Request<UpdateProductInput["params"]>,
    response: Response
) {
    let user_id = response.locals.user;
    let product_id = request.params.product_id;
    let update = request.body;

    let product = await get_product({product_id});
    
    if (!product) return response
        .sendStatus(404)
        .send("Unable to get the product")
    if (product.user_id !== user_id) return response.sendStatus(403)

    let update_product_item = await get_product({product_id})

    return response.send(update_product_item)

}
export async function get_product_handler(
    request: Request<GetProductInput["params"]>,
    response: Response
) {
    let user_id = response.locals.user;
    let product_id = request.params.product_id;
    let update = request.body;

    let product = await get_product({product_id});
    
    if (!product) return response
    .sendStatus(404)
    .send("Unable to get the product")
    
    if (String(product.user_id) !== user_id) return response.sendStatus(403)
    return response.send(product)

}
export async function delete_product_handler(
    request: Request<DeleteProductInput["params"]>,
    response: Response
) {let user_id = response.locals.user;
    let product_id = request.params.product_id;
    let update = request.body;

    let product = await get_product({product_id});
    
    if (!product) return response
        .sendStatus(404)
        .send("Unable to get the product")
    if (String(product.user_id) !== user_id) return response.sendStatus(403)

    let update_product_item = await delete_product({product_id})

    return response.send(update_product_item)
}