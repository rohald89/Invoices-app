<script lang="ts">
  import { invoices } from '$lib/stores/InvoiceStore';
  import ArrowLeft from '$lib/components/icons/ArrowLeft.svelte';
  import DetailHeader from './DetailHeader.svelte';
  import InvoiceDetails from './InvoiceDetails.svelte';
  import { goto } from '$app/navigation';

  /** @type {import('/$types').PageData} */
  export let data: Invoice;

  $: invoice = $invoices.find((i) => i.id === data.id);
</script>

{#if invoice}
  <div>
    <a
      href="/"
      class="flex items-center gap-6 text-body-1 font-bold tracking-normal text-black dark:text-offWhite"
    >
      <ArrowLeft />
      Go Back</a
    >
  </div>

  <div class="mt-8 flex flex-col gap-4 ">
    <DetailHeader {invoice} status={invoice.status} id={invoice.id} />
    <InvoiceDetails {invoice} />
  </div>
{:else}
  <div class="flex h-full flex-col items-center justify-center">
    <ArrowLeft class="h-8 w-8 text-gray-500" on:click={() => goto('/')} />
    <p class="mt-4 text-gray-500">Invoice not found</p>
  </div>
{/if}
