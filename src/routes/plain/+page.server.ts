export function load({ setHeaders, cookies }) {
    // setHeaders({
	// 	'Content-Type': 'text/plain'
	// });

    // setHeaders는 Set-Cookie 헤더와 같이 설정할 수 없다.
    // cookies를 통해 쿠키를 설정해야 한다.
    const visited = cookies.get('visited');

	cookies.set('visited', 'true', {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 // 1 day
    });

	return {
		visited
	};
}
