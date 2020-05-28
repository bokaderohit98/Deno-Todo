const env = Deno.env.toObject();
export const HOST = "127.0.0.1" || env.HOST;
export const PORT = 8080 || env.PORT;
