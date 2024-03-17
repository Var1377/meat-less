import { error } from '@sveltejs/kit';
import { getProductDetails } from './productDatabase.js';
import { verifyImage } from './verification.server.js';
import { creditUser } from './creditUser.js';
import { extname } from 'path';

async function encodeImageFileToBase64Url(file: File) {
    const array = await file.arrayBuffer();
    const base64String = Buffer.from(array).toString('base64');
    const extension = extname(file.name).substring(1);
    return `data:image/${extension};base64,${base64String}`;
}



export const actions = {
    verify:  async ({ params, request }) => {
        const { barcode } = params;

        const formData = await request.formData();

        const image = formData.get('image') as File;
        const userAddress = formData.get('userAddress') as string;

        const imageURL = await encodeImageFileToBase64Url(image);

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

        const verificationResult = await verifyImage(product, imageURL);

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