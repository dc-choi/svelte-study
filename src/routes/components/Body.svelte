<script lang="ts">
    import type Cat from "../../@types/Cat";
    import type User from "../../@types/User";
    import NextPage from "../page/NextPage.svelte";
    import Inner from "../page/Inner.svelte";

	let name: string = 'world';
	let src: string = 'images/favicon.png';

    let count: number = 0;
    let increment = () => count += 1;
    // 반응형 선언: 참조된 변수가 변경되면 자동으로 업데이트
    // 여러 번 참조해야 하거나 다른 반응형 값에 종속되는 값이 있을 때 특히 유용함
    $: double = count * 2;

    $: if (count >= 10) {
        alert(`count is dangerously high!`);
        count = 9;
    }

    let numbers: number[] = [1];
    let add = () => numbers = [...numbers, numbers.length + 1];
    $: sum = numbers.reduce((t, n) => t + n, 0);

    let user: User = {
        isLogin: false,
    };
    let toggle = () => user.isLogin = !user.isLogin;

    let cats: Cat[] = [
        { id: 1, name: '1' },
        { id: 2, name: '2' },
        { id: 3, name: '3' },
    ];

    let handleClick = () => {
        alert('no more alert');
    };
</script>

<div>
    <h1>Hello {name.toUpperCase()}!</h1>

    <img {src} alt="" />
    <img src="{src}" alt="" />

    <p>This is a paragraph.</p>

    <NextPage name={ 'hi' } />
    <NextPage />

    <button on:click={increment}>
        Clicked {count}
        {count === 0 || count === 1 ? 'time' : 'times'}
    </button>

    <p>{count} doubled is {double}</p>

    <p>{numbers.join(' + ')} = {sum}</p>

    <button on:click={add}> Add a number </button>

    {#if user.isLogin}
        <button on:click={toggle}> Logout </button>
    {:else}
        <button on:click={toggle}> Login </button>
    {/if}

    <ul>
        {#each cats as { name }, index}
            <li>{index} : {name}</li>
        {/each}
    </ul>

    <!--
        on:click|once: 처음 실행한 후 핸들러를 제거합니다.
        on:click|passive: 터치/휠 이벤트에서 스크롤링 성능 향상(스벨트가 안전한 경우 자동으로 추가)
        on:click|self: event.target이 요소 자체인 경우에만 트리거 핸들러를 실행합니다.
        on:click|trusted: event.isTrusted가 참인 경우에만 핸들러를 트리거합니다. 즉, 사용자 액션에 의해 이벤트가 트리거되는 경우입니다.

        각각 |로 구분하여 여러 개의 수식어를 사용할 수 있습니다.
     -->
    <button on:click|once={handleClick}> Click </button>

    <Inner on:message={ event => alert(event.detail.text) } />
</div>

<style>
    p {
        color: purple;
        font-family: 'Comic Sans MS', cursive;
        font-size: 2em;
    }

    button {
        width: 200px;
    }
</style>
