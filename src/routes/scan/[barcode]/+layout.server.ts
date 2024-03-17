import { error } from '@sveltejs/kit';
import { getProductDetails } from './productDatabase.js';


export const load = async ({ params }) => {
    const { barcode } = params;

    const details = getProductDetails(barcode);

    if (!details) {
        throw error(
            404,
            `Product with barcode ${barcode} not found`,
        )
    }

    return {
        barcode,
        product: details,
    }
}