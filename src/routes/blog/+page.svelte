<script lang="ts">
    // 데이터 프로퍼티를 통해 +page.svelte에서 액세스할 수 있습니다.
    export let data;
</script>

<h1>blog</h1>

<ul>
	{#each data.summaries as { id, title }}
		<li><a href="/blog/{id}">{title}</a></li>
	{/each}
</ul>
