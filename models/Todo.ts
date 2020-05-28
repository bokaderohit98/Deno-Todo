import dbHandler from "../utils/dbHandler.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

interface TodoSchema {
	id: string;
	date: number;
	text: string;
	completed: boolean;
}

const { fetchData, saveData } = dbHandler<TodoSchema>("todo.json");

const data: Array<TodoSchema> = await fetchData();

class Todo {
	todos: Array<TodoSchema>;

	constructor() {
		this.todos = data;
	}

	find = async (
		completed: boolean | undefined
	): Promise<Array<TodoSchema> | []> => {
		if (completed === undefined) return this.todos;
		return this.todos.filter(
			(todo: TodoSchema) => todo.completed === completed
		);
	};

	findById = async (id: string): Promise<TodoSchema | undefined> => {
		return this.todos.find((todo: TodoSchema) => todo.id === id);
	};

	removeById = async (id: string): Promise<TodoSchema | undefined> => {
		const index = this.todos.findIndex(
			(todo: TodoSchema) => todo.id === id
		);
		if (index < 0) return undefined;

		const removedTodo = this.todos[index];
		this.todos = this.todos.filter((_, i) => i !== index);
		await saveData(this.todos);

		return removedTodo;
	};

	findByIdAndUpdate = async (
		id: string,
		values: { text?: string; completed?: boolean }
	): Promise<TodoSchema | undefined> => {
		const index = this.todos.findIndex(
			(todo: TodoSchema) => todo.id === id
		);
		if (index < 0) return undefined;

		const updated = this.todos[index];
		if (values.text) updated.text = values.text;
		if (values.completed !== undefined)
			updated.completed = values.completed;

		await saveData(this.todos);

		return updated;
	};

	save = async (text: string): Promise<TodoSchema> => {
		const newTodo = {
			id: v4.generate(),
			date: new Date().valueOf(),
			text,
			completed: false,
		};

		this.todos.push(newTodo);
		await saveData(this.todos);

		return newTodo;
	};
}

export default new Todo();
