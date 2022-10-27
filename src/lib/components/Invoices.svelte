<script lang="ts">
  import InvoiceCard from './InvoiceCard.svelte';
  import NothingHere from './NothingHere.svelte';

  export let data;
</script>

<div class="flex flex-col gap-y-4">
  {#if $data === null}
    <p>Loading...</p>
  {:else if $data.length === 0}
    <NothingHere />
  {:else}
    {#each $data as invoice}
      <InvoiceCard {invoice} />
    {/each}
  {/if}
</div>
