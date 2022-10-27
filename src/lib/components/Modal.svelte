<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Overlay from './Overlay.svelte';
  import Portal from './Portal.svelte';

  export let isVisible: boolean = false;

  const dispatch = createEventDispatcher();
</script>

<svelte:window
  on:keydown={(event) => {
    if (event.key === 'Escape') {
      dispatch('close');
    }
  }}
/>

{#if isVisible}
  <Portal>
    <Overlay />
    <div class="center fixed inset-0 z-modal">
      <div class="relative min-h-[230px] w-full max-w-[480px] rounded-lg bg-white px-10 py-7">
        <button
          on:click={() => dispatch('close')}
          class="hover: text-pastelPurple hover:text-daisyBush absolute right-4 top-4"
        >
          <h1>Close</h1>
        </button>
        <slot />
      </div>
    </div>
  </Portal>
{/if}
