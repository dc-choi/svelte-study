<script lang="ts">
    import { fly, slide } from 'svelte/transition';
    import { enhance } from '$app/forms';

	export let data;
    export let form;

    let creating: boolean = false;
	let deleting: any[] = [];
</script>

<div class="centered">
	<h1>todos</h1>

    {#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

    {#if creating}
		<span class="saving">saving...</span>
	{/if}

    <!--
        같은 페이지에서 작업을 진행하므로 ?로 기호를 생략할 수 있다.

        enhance를 사용하게 되면 기존 HTML요소로서 강화된다.
        enhance가 활성화된 경우에는 Svelte 컴포넌트가 기존 HTML 요소를 대체하는 것이 아니라, 해당 요소를 기반으로 동적인 기능이 추가되는 방식으로 작동
        웹 페이지가 더 빠르게 로드되며, JavaScript가 비활성화된 환경에서도 웹 페이지의 기본 기능이 작동함.
        이는 접근성과 웹 페이지의 성능 향상에 기여
     -->
	<form method="POST" action="?/create" use:enhance={() => {
        creating = true;

        return async ({ update }) => {
            await update();
            creating = false;
        };
    }}>
		<label>
			add a todo:
			<input
				name="description"
                disabled={creating}
                value={form?.description ?? ''}
				autocomplete="off"
                required
			/>
		</label>
	</form>

	<ul class="todos">
		{#each data.todos as todo (todo.id)}
            <li in:fly={{ y: 20 }} out:slide>
				<form method="POST" action="?/delete" use:enhance={() => {
                    deleting = [...deleting, todo.id];
                    return async ({ update }) => {
                        await update();
                        deleting = deleting.filter((id) => id !== todo.id);
                    };
                }}>
					<input type="hidden" name="id" value={todo.id} />
					<span>{todo.description}</span>
					<button aria-label="Mark as complete" />
				</form>
			</li>
		{/each}
	</ul>
</div>

<style>
	.centered {
		max-width: 20em;
		margin: 0 auto;
	}

	label {
		width: 100%;
	}

	input {
		flex: 1;
	}

	span {
		flex: 1;
	}

	button {
		border: none;
		background-size: 1rem 1rem;
		cursor: pointer;
		height: 100%;
		aspect-ratio: 1;
		opacity: 0.5;
		transition: opacity 0.2s;
	}

	button:hover {
		opacity: 1;
	}

	.saving {
		opacity: 0.5;
	}
</style>
