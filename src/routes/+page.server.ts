// 앱이 빌드 될 때 .env 파일에서 환경변수를 가져올 수 있다.
import { USER, PASSWORD } from '$env/static/private';
// 앱이 런타임에 있을 때 .env 파일에서 환경변수를 가져올 수 있다.
// import { env } from '$env/dynamic/private';

export function load() {
    console.log(USER);
    console.log(PASSWORD);
    // console.log(env.PASSWORD);
    // console.log(env.PASSWORD);
}
