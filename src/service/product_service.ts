import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Product, {ProductInput, ProductModel} from '../models/product'




export async function create_new_product(
    input: ProductInput
) {
    return Product.create(input)
}
export async function get_product(
    query: FilterQuery<ProductModel>,
    options: QueryOptions = {lean: true}
) {
    const product = await Product
        .findOne(query, {}, options);
    return product 
}
export async function update_product(
    query: FilterQuery<ProductModel>, 
    update: UpdateQuery<ProductModel>,
    options: QueryOptions = {lean: true}
) {
    return Product.findOneAndUpdate(query, update, options)
}


export async function delete_product(
    query: FilterQuery<ProductModel>
) { 
    return Product.deleteOne(query)
}