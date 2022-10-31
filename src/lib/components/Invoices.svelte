<script lang="ts">
  import { filteredInvoices } from '$lib/stores/InvoiceStore';
  import InvoiceCard from './InvoiceCard.svelte';
  import NothingHere from './NothingHere.svelte';
</script>

<svelte:head>
  <title>Invoices App | Home</title>
  <meta name="description" content="Invoices App" />
</svelte:head>

<div class="flex flex-col gap-y-4">
  {#if $filteredInvoices === null}
    <p>Loading...</p>
  {:else if $filteredInvoices.length === 0}
    <NothingHere />
  {:else}
    {#each $filteredInvoices as invoice}
      <InvoiceCard {invoice} />
    {/each}
  {/if}
</div>
