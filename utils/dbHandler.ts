interface signature {
	fetchData: Function;
	saveData: Function;
}

const dir = "./db/";

export default <type>(path: string): signature => ({
	fetchData: async (): Promise<Array<type>> => {
		const decoder = new TextDecoder();

		const data = await Deno.readFile(dir + path);
		const decodedData = decoder.decode(data);

		return JSON.parse(decodedData);
	},
	saveData: async (data: type): Promise<void> => {
		const encoder = new TextEncoder();
		await Deno.writeFile(dir + path, encoder.encode(JSON.stringify(data)));
	},
});
