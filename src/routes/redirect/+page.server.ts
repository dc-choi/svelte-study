import { redirect } from "@sveltejs/kit";

/**
 * 303 - 성공적인 제출 후 양식 작업의 경우
 * 307 - 임시 리디렉션의 경우
 * 308 - 영구 리디렉션의 경우
 */
export function load() {
    throw redirect(307, '/todo');
}
