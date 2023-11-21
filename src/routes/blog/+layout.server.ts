import { posts } from './data';

/**
 * 모든 하위 경로에 대한 데이터를 로드함.
 */
export function load() {
	return {
		summaries: posts.map((post) => ({
			id: post.id,
			title: post.title
		}))
	};
}
