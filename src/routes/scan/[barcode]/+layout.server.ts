import { getProductDetails, type ProductDetails } from './productDatabase.js';


export const load = async ({ params }) => {
    const { barcode } = params;

    const details: Partial<ProductDetails> = getProductDetails(barcode) ?? {};

    return {
        barcode,
        product: details,
    }
}