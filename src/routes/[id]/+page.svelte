<script lang="ts">
  import { invoices } from '$lib/stores/InvoiceStore';
  import ArrowLeft from '$lib/components/icons/ArrowLeft.svelte';
  import DetailHeader from './DetailHeader.svelte';
  import InvoiceDetails from './InvoiceDetails.svelte';
  import NotFound from '$lib/components/NotFound.svelte';

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
  <NotFound />
{/if}
