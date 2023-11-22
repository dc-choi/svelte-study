<script>
    import './app.css';

    import Header from '../components/Header.svelte';
    import Footer from '../components/Footer.svelte';
</script>

<div class="app">
    <Header />

    <!--
        파일 시스템 기반 라우팅을 사용하므로 앱의 경로
        즉 사용자가 특정 URL로 이동할 때 앱이 수행해야 하는 작업은 코드베이스의 디렉터리에 의해 정의됨.
     -->
    <main>
        <!--
            하위 페이지가 랜더링 되는 곳
         -->
        <slot />
    </main>

    <Footer />
</div>
