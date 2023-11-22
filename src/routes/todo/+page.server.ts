import * as db from '$lib/database';
import { fail } from '@sveltejs/kit';

export function load({ cookies }) {
	const id = cookies.get('userid');

	if (!id) {
		cookies.set('userid', crypto.randomUUID(), { path: '/' });
	}

	return {
        // @ts-expect-error
		todos: db.getTodos(id) ?? []
	};
}

export const actions = {
    // 명명된 동작과 기본 동작은 공존할 수 없다.
	// default: async ({ cookies, request }) => {
	// 	const data = await request.formData();
	// 	db.createTodo(cookies.get('userid'), data.get('description'));
	// }
    create: async ({ cookies, request }) => {
        await new Promise((fulfil) => setTimeout(fulfil, 1000));

		const data = await request.formData();
		try {
            // @ts-expect-error
			db.createTodo(cookies.get('userid'), data.get('description'));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return fail(422, {
				description: data.get('description'),
				error: error.message
			});
		}
	},
	delete: async ({ cookies, request }) => {
        await new Promise((fulfil) => setTimeout(fulfil, 1000));

		const data = await request.formData();
        // @ts-expect-error
		db.deleteTodo(cookies.get('userid'), data.get('id'));
	},
};
