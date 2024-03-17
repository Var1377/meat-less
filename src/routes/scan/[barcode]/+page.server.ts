import { error } from '@sveltejs/kit';
import { getProductDetails } from './productDatabase.js';
import { verifyImage } from './verification.server.js';
import { creditUser } from './creditUser.js';

export const actions = {
    verify:  async ({ params, request }) => {
        const { barcode } = params;

        const formData = await request.formData();

        const image = formData.get('image') as File;
        const userAddress = formData.get('userAddress') as string;

        const product = getProductDetails(barcode);

        if (!image) throw error(400, 'No image provided');
        if (!userAddress) throw error(400, 'No user address provided');

        if (!product) {
            return {
                status: 404,
                body: {
                    error: `Product with barcode ${barcode} not found`,
                }
            }
        }

        const verificationResult = await verifyImage(product, image);

        if (!verificationResult.verified) throw error(400, verificationResult.failedVerificationMessage);

        const creditResponse = await creditUser(userAddress, product, verificationResult);

        return {
            status: 200,
            body: {
                ...verificationResult,
                credited: creditResponse
            }
        }
    }
};