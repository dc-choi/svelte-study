<script lang="ts">
    import { page, updated } from '$app/stores';
    /**
     * page: 현재 페이지에 대한 정보를 가져온다.
     * url - 현재 페이지의 URL
     * params - 현재 페이지의 매개변수
     * route - 현재 경로를 나타내는 id 속성을 가진 객체
     * status - 현재 페이지의 HTTP 상태 코드
     * error - 현재 페이지의 오류 객체(있는 경우)
     * data - 모든 로드 함수의 반환값을 결합한 현재 페이지의 데이터입니다.
     * form - 폼 액션에서 반환된 데이터
    */

   /**
    * updated: 페이지가 업데이트된 것을 확인할 수 있는 스토어
   */
</script>

<header>
    <nav>
        <a href="/" aria-current={$page.url.pathname === '/'}>home</a>
        <a href="/about" aria-current={$page.url.pathname === '/about'}>about</a>
        <a href="/blog" aria-current={$page.url.pathname === '/blog'}>blog</a>
        <a href="/plain" aria-current={$page.url.pathname === '/plain'}>plain</a>
        <a href="/a/deep/route/path" aria-current={$page.url.pathname === '/a/deep/route/path'}>a/deep/route/path</a>
        <a href="/todo" aria-current={$page.url.pathname === '/todo'}>todo</a>
        <a href="/error" aria-current={$page.url.pathname === '/error'}>error</a>
        <a href="/redirect" aria-current={$page.url.pathname === '/redirect'}>redirect</a>
    </nav>

    {#if $updated}
        <p class="toast">
            A new version of the app is available

            <button on:click={() => location.reload()}>
                reload the page
            </button>
        </p>
    {/if}
</header>
