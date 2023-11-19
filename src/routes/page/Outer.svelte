<script>
    import Inner from "./Inner.svelte";
</script>

<!--
    Svelte는 값 없이 '모든 메시지 이벤트 전달'을 의미하는 on:message 이벤트 지시문을 대체할 수 있는 약어를 제공합니다.
-->
<Inner on:message />
