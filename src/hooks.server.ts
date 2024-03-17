// export const handle = async ({ event, resolve }) => {
//     const result = await resolve(event);

//     // Set default status code to 200 if not defined
//     const statusCode = result.status || 200;

//     // Add permissive CORS headers
//     return {
//         ...result,
//         status: statusCode,
//         headers: new Headers({
//             ...result.headers,
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Headers': '*',
//             'Access-Control-Allow-Methods': '*',
//         }),
//     };
// }