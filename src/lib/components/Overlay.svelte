<script lang="ts">
  import { fade } from 'svelte/transition';
  export let zIndex: string;
  export let onOverlayClick: () => void;
</script>

<svelte:head>
  <style lang="postcss">
    body {
      @apply overflow-hidden;
    }
  </style>
</svelte:head>

<div
  on:click={onOverlayClick}
  on:keydown={(event) => {
    if (event.key === 'Escape') {
      onOverlayClick();
    }
  }}
  transition:fade={{ duration: 300 }}
  class={`${zIndex} fixed inset-0 bg-black opacity-50`}
/>
