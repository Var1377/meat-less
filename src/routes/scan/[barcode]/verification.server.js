import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

const mockImageModelCall = false;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export const verifyImage = async (product, imageURL) => {
	// image:
	// {
	//     fieldname: 'image',
	//     originalname: 'Screenshot 2024-03-16 at 23.55.23.png',
	//     encoding: '7bit',
	//     mimetype: 'image/png',
	//     destination: 'uploads/',
	//     filename: '2680372ebe8bf872adf325f8643998bc',
	//     path: 'uploads/2680372ebe8bf872adf325f8643998bc',
	//     size: 61763
	//   }


	const prompt = `You will be given an image, and your task is to verify an image contains an open packet of a product.
This will be used in an app designed to encourage users to eat more sustainably, and provide small monetary rewards for doing so. Your task is to verify they have actually purchased the product and used it, and not just taken a picture of it in a store. The packet must be open. If the product is not open, reject verification and provide feedback to the user that the product must be open.

Response in JSON format, with a boolean field "verified" set to true if the image contains the product, and false otherwise.
Additionally, include a field "message" with a string describing why the image was not verified, if applicable. If the image is verified, the message field should be omitted. Be kind to the user and provide helpful feedback if the image is not verified. Keep feedback short (<10 words). If the product in the image is not the specified product, say so and include the name of the wanted product (shorten it to max 4 words if longer than this), and say please. For example: "Incorrect product, please submit Grapefruit Ting.".`;

	let userLevelMessage = `Product name: ${product.name}`;
	if (product.description) {
		userLevelMessage += `Description: ${product.description}`;
	}

	if (mockImageModelCall) {
		console.log('mocking image model call, returning verified: true');
		return {
			verified: true
		};
	}

	const response = await openai.chat.completions.create({
		model: 'gpt-4-vision-preview',
		max_tokens: 150,
		messages: [
			{
				role: 'system',
				content: [{ type: 'text', text: prompt }]
			},
			{
				role: 'user',
				content: [
					{ type: 'text', text: userLevelMessage },
					{
						type: 'image_url',
						image_url: {
							url: imageURL,
						}
					}
				]
			}
		]
	});

	const llmResponse = response.choices[0].message.content;
	console.log('llmResponse', llmResponse);

	const jsonFromLLM = attemptParseJsonFromLLM(llmResponse);
	if (jsonFromLLM === null) {
		console.log('failed to parse json from llm');
		console.log('llmResponse', llmResponse);

		return {
			verified: false,
			failedVerificationMessage: 'Failed to verify image. Please try again.',
			internalMessage: 'Failed to parse response from LLM'
		};
	}

	console.log('successfully parsed json from llm');
	console.log(jsonFromLLM);

	if (jsonFromLLM.verified === true) {
		return {
			verified: true
		};
	}

	if (jsonFromLLM.verified !== false) {
		return {
			verified: false,
			failedVerificationMessage: 'Failed to verify image. Please try again.',
			internalMessage: 'json from llms verified field was not a boolean'
		};
	}

	if (jsonFromLLM.message.split(' ').length > 10) {
		return {
			verified: false,
			failedVerificationMessage: 'Failed to verify image. Please try again.',
			internalMessage: 'json from llms message field was too long'
		};
	}

	if (
		jsonFromLLM.message === undefined ||
		jsonFromLLM.message === null ||
		jsonFromLLM.message === ''
	) {
		return {
			verified: false,
			failedVerificationMessage: 'Failed to verify image. Please try again.',
			internalMessage: 'json from llms message field was empty'
		};
	}

	return {
		verified: false,
		failedVerificationMessage: jsonFromLLM.message
	};
};

const attemptParseJsonFromLLM = (llmResponse) => {
	let jsonStr;
	if (llmResponse.startsWith('```')) {
		let jsonStart;
		if (llmResponse.startsWith('```json')) {
			jsonStart = 7;
		} else {
			jsonStart = 3;
		}
		const jsonEnd = llmResponse.lastIndexOf('```');
		jsonStr = llmResponse.substring(jsonStart, jsonEnd);
	} else {
		jsonStr = llmResponse;
	}

	try {
		const json = JSON.parse(jsonStr);
		return json;
	} catch (e) {
		return null;
	}
};