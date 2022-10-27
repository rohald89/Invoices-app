<script lang="ts">
  import { fade } from 'svelte/transition';
  export let zIndex: string;
</script>

<svelte:head>
  <style lang="postcss">
    body {
      @apply overflow-hidden;
    }
  </style>
</svelte:head>

<div transition:fade={{ duration: 300 }} class={`${zIndex} fixed inset-0 bg-black opacity-50`} />
