<script lang="ts">
    import type ICat from "../../@types/ICat";
    import type IUser from "../../@types/IUser";
    import NextPage from "../page/NextPage.svelte";
    import Outer from "../page/Outer.svelte";
    import BigRedButton from "../page/BigRedButton.svelte";

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

    let user: IUser = {
        isLogin: false,
    };
    let toggle = () => user.isLogin = !user.isLogin;

    let cats: ICat[] = [
        { id: 1, name: '1' },
        { id: 2, name: '2' },
        { id: 3, name: '3' },
    ];

    let handleClick = () => {
        alert('no more alert');
    };

    let buttonClick = () => {
        alert('button clicked');
    };

    let a: number = 1;
	let b: number = 2;

    let yes: boolean = false;

    let questions = [
		{
			id: 1,
			text: `Where did you go to school?`
		},
		{
			id: 2,
			text: `What is your mother's name?`
		},
		{
			id: 3,
			text: `What is another personal fact that an attacker could easily find with Google?`
		}
	];

	let selected: { id: any; text: any; };

	let answer = '';

	let handleSubmit = () => {
		alert(
			`answered question ${selected.id} (${selected.text}) with "${answer}"`
		);
	}
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

    <Outer on:message={ event => alert(event.detail.text) } />

    <BigRedButton on:click={buttonClick} />

    <!-- bind를 사용하게 되면 변경되는 이벤트를 감지하여 value를 변경한다. -->
    <input bind:value={name} />


    <!--
        DOM에서는 모든 것이 문자열입니다. 이는 유형="숫자" 및 유형="범위"와 같은 숫자 입력을 처리할 때 유용하지 않습니다.
        입력값을 사용하기 전에 입력값을 강제로 입력해야 한다는 것을 기억해야 하기 때문입니다.

        svelte에서는 bind를 사용하면 이를 자동으로 처리합니다.
     -->
    <label>
        <input type="number" bind:value={a} min="0" max="10" />
        <input type="range" bind:value={a} min="0" max="10" />
    </label>

    <label>
        <input type="number" bind:value={b} min="0" max="10" />
        <input type="range" bind:value={b} min="0" max="10" />
    </label>

    <p>{a} + {b} = {a + b}</p>

    <!--
        체크박스는 상태 간 토글에 사용됩니다. checked를 사용합니다.
     -->
    <label>
        <input type="checkbox" bind:checked={yes} />
        Yes! Send me regular email spam
    </label>

    {#if yes}
        <p>
            Thank you. We will bombard your inbox and sell
            your personal details.
        </p>
    {:else}
        <p>
            You must opt in to continue. If you're not
            paying, you're the product.
        </p>
    {/if}

    <button disabled={!yes}>Subscribe</button>

    <h2>Insecurity questions</h2>

    <form on:submit|preventDefault={handleSubmit}>
        <select
            bind:value={selected}
            on:change={() => (answer = '')}
        >
            {#each questions as question}
                <option value={question}>
                    {question.text}
                </option>
            {/each}
        </select>

        <input bind:value={answer} />

        <button disabled={!answer} type="submit">
            Submit
        </button>
    </form>

    <p>
        selected question {selected
            ? selected.id
            : '[waiting...]'}
    </p>
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
