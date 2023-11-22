import type ITodo from "../@types/ITodo";

// In a real app, this data would live in a database,
// rather than in memory. But for now, we cheat.
const db = new Map<string, ITodo[]>();

export const getTodos = (userid: string) => {
	if (!db.get(userid)) {
		db.set(userid, [{
			id: crypto.randomUUID(),
			description: 'Learn SvelteKit',
			done: false
		}]);
	}

	return db.get(userid);
}

export const createTodo = (userid: string, description: string) => {
    if (description === '') {
		throw new Error('todo must have a description');
	}

	const todos = db.get(userid);

    if (todos?.find((todo: ITodo) => todo.description === description)) {
		throw new Error('todos must be unique');
	}

	todos?.push({
		id: crypto.randomUUID(),
		description,
		done: false
	});
}

export const deleteTodo = (userid: string, todoid: string) => {
	const todos = db.get(userid);
	let index = todos?.findIndex((todo: ITodo) => todo.id === todoid);

    index = typeof index === 'undefined' ? -1 : index;
	if (index !== -1) {
		todos?.splice(index, 1);
	}
}
