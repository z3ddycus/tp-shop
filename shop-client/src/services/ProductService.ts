import axios, { AxiosResponse } from 'axios';
import { MinimalProduct, Product, ResponseArray } from '../types';

export function getProducts(page: number, size: number, options: { [key: string]: string | number } = {}): Promise<ResponseArray<Product>> {
    const queryParams = Object.keys(options)
        .map(key => `${key}=${options[key]}`)
        .join('&');
    return axios.get(`${process.env.REACT_APP_API}/products?page=${page}&size=${size}${queryParams ? `&${queryParams}` : ''}`);
}

export function getProductsbyShop(shopId: string, page: number, size: number, options: { [key: string]: string | number } = {}): Promise<ResponseArray<Product>> {
    const queryParams = Object.keys(options)
        .map(key => `${key}=${options[key]}`)
        .join('&');
    return axios.get(`${process.env.REACT_APP_API}/products?page=${page}&size=${size}${queryParams ? `&${queryParams}` : ''}`);
}

export function getProductsbyShopAndCategory(
    shopId: string,
    categoryId: number,
    page: number,
    size: number,
    options: { [key: string]: string | number } = {}
): Promise<ResponseArray<Product>> {
    const queryParams = Object.keys(options)
        .map(key => `${key}=${options[key]}`)
        .join('&');
    return axios.get(
        `${process.env.REACT_APP_API}/products?shopId=${shopId}&categoryId=${categoryId}&page=${page}&size=${size}${queryParams ? `&${queryParams}` : ''}`,
    );
}

export function getProduct(id: string): Promise<AxiosResponse<Product>> {
    return axios.get(`${process.env.REACT_APP_API}/products/${id}`);
}

export function createProduct(product: MinimalProduct): Promise<AxiosResponse<Product>> {
    return axios.post(`${process.env.REACT_APP_API}/products`, product);
}

export function editProduct(product: MinimalProduct): Promise<AxiosResponse<Product>> {
    return axios.put(`${process.env.REACT_APP_API}/products`, product);
}

export function deleteProduct(id: string): Promise<AxiosResponse<Product>> {
    return axios.delete(`${process.env.REACT_APP_API}/products/${id}`);
}
