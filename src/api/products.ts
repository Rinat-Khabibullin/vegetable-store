import ky from 'ky';
import type { Product } from '../types/Product.ts';

const API_URL =
  'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';

export async function getProducts(): Promise<Product[]> {
  try {
    const products = await ky.get(API_URL).json<Product[]>();
    return products;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Ошибка при загрузке продуктов:', error.message);
    } else {
      console.error('Неизвестная ошибка при загрузке продуктов:', error);
    }


    return [];

  }
}
