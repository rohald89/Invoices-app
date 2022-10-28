<script lang="ts">
  import { fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import Overlay from './Overlay.svelte';
  import Portal from './Portal.svelte';

  export let isVisible: boolean = false;

  const dispatch = createEventDispatcher();

  const closeModal = () => {
    dispatch('close');
  };
</script>

<svelte:window
  on:keydown={(event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  }}
/>

{#if isVisible}
  <Portal>
    <Overlay zIndex="z-modalOverlay" onOverlayClick={() => closeModal()} />
    <div
      transition:fly={{ y: -200, duration: 300 }}
      class="absolute top-1/2 left-1/2 z-modal w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-8 py-8 dark:bg-veryDarkBlue md:p-12"
    >
      <slot />
    </div>
  </Portal>
{/if}
