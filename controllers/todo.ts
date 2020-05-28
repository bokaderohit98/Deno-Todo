import Todo from "../models/Todo.ts";
import { helpers } from "https://deno.land/x/oak/mod.ts";

const invalidIdResponse = (response: any) => {
	response.status = 400;
	response.body = { message: "Invalid TODO ID Provided!" };
};

const textMissingResponse = (response: any) => {
	response.status = 400;
	response.body = { message: "Todo text is missing!" };
};

export const listAllTodos = async (ctx: any) => {
	const query = helpers.getQuery(ctx);
	let completed: boolean | undefined = undefined;
	if (query.completed && query.completed === "true") completed = true;
	else if (query.completed && query.completed === "false") completed = false;
	ctx.response.body = await Todo.find(completed);
};

export const findTodoById = async ({ response, params }: any) => {
	const { id } = params;
	const todo = await Todo.findById(id);

	if (!todo) return invalidIdResponse(response);
	response.body = todo;
};

export const addTodo = async ({ response, request }: any) => {
	if (!request.hasBody) return textMissingResponse(response);

	const { value } = await request.body();
	if (!value.text) return textMissingResponse(response);

	response.body = await Todo.save(value.text);
};

export const deleteTodo = async ({ response, params }: any) => {
	const { id } = params;
	const todo = await Todo.removeById(id);

	if (!todo) return invalidIdResponse(response);
	response.body = todo;
};

export const toggleCompleted = async ({ response, params }: any) => {
	const { id } = params;
	const todo = await Todo.findById(id);
	if (!todo) return invalidIdResponse(response);

	const updatedTodo = await Todo.findByIdAndUpdate(id, {
		completed: !todo.completed,
	});
	response.body = updatedTodo;
};

export const updateTodoText = async ({ request, response, params }: any) => {
	if (!request.hasBody) return textMissingResponse(response);

	const { id } = params;
	const { value } = await request.body();
	if (!value.text) return textMissingResponse(response);

	const todo = await Todo.findByIdAndUpdate(id, { text: value.text });
	if (!todo) return invalidIdResponse(response);
	response.body = todo;
};
