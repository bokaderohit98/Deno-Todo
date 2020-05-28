import * as todo from "../controllers/todo.ts";
import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router
	.get("/todos", todo.listAllTodos)
	.get("/todos/:id", todo.findTodoById)
	.post("/todos", todo.addTodo)
	.delete("/todos/:id", todo.deleteTodo)
	.put("/todos/:id/toggle-completed", todo.toggleCompleted)
	.put("/todos/:id/update", todo.updateTodoText);

export default router;
