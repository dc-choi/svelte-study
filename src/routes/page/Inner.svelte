<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let sayHello = () => {
        dispatch('message', {
            text: 'Hello!'
        });
    };
</script>

<button on:click={sayHello}> Click to say hello </button>
