import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import ProductModel, { ProductClass } from '../models/product.model';

interface ProductInput {
  user: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export async function createProduct(input: ProductInput) {
  return await ProductModel.create(input);
}

export async function findProduct(
  query: FilterQuery<ProductClass>,
  options: QueryOptions = { lean: true }
) {
  return await ProductModel.findOne(query, {}, options);
}

export async function findAndUpdateProduct(
  query: FilterQuery<ProductClass>,
  update: UpdateQuery<ProductClass>,
  options: QueryOptions
) {
  return await ProductModel.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(query: FilterQuery<ProductClass>) {
  return await ProductModel.deleteOne(query);
}
