import { error } from '@sveltejs/kit';
import { posts } from '../data';

/**
 * 앱의 모든 페이지는 +page.server.js 파일에서 +page.svelte 파일과 함께 load() 함수를 선언할 수 있습니다.
 * 파일 이름에서 알 수 있듯이 이 모듈은 클라이언트 측 탐색을 포함하여 서버에서만 실행됩니다.
 * 데이터 프로퍼티를 통해 +page.svelte에서 액세스할 수 있습니다.
 */
export function load({ params }) {
    const parseId = parseInt(params.id);
	const post = posts.find((post) => post.id === parseId);

	if (!post) throw error(404);

	return {
		post
	};
}
