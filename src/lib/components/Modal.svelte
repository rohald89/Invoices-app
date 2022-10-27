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
    <div class="center fixed inset-0 z-modal p-6">
      <div
        class="relative w-full max-w-lg rounded-lg bg-white px-8 py-8 dark:bg-veryDarkBlue md:p-12"
      >
        <slot />
      </div>
    </div>
  </Portal>
{/if}
