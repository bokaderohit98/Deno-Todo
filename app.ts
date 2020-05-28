import { Application } from "https://deno.land/x/oak/mod.ts";
import todoRouter from "./routers/todo.ts";
import serverError from "./middlewares/serverError.ts";
import notFound from "./middlewares/notFound.ts";

const app = new Application();

app.use(serverError);
app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());
app.use(notFound);

app.addEventListener("listen", ({ port }) =>
	console.log(`Server running on port ${port}`)
);

app.addEventListener("error", (event) => {
	console.log(event.error);
});

app.listen({ port: 8080 });
