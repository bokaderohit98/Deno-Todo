export default async ({ response }: any, next: any) => {
	try {
		await next();
	} catch (error) {
		response.status = 500;
		response.body = { message: error.message };
		console.log(error.message);
	}
};
