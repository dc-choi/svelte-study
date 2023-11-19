<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    // 컴포넌트도 이벤트를 디스패치할 수 있다.
    // 디스패치란 하위 컴포넌트에서 상위 컴포넌트의 함수를 호출해 사용하는 것을 말한다.
    const dispatch = createEventDispatcher();

    let sayHello = () => {
        dispatch('message', {
            text: 'Hello!'
        });
    };
</script>

<button on:click={sayHello}> Click to say hello </button>
