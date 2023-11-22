<!-- 동적 매개변수를 사용하여 라우팅을 하는 경우 -->
<script>
	export let data;
</script>

<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>
