<script lang="ts">
  import { getInvoice } from '$lib/stores/InvoiceStore';
  import ArrowLeft from '$lib/components/icons/ArrowLeft.svelte';
  import DetailHeader from './DetailHeader.svelte';
  import InvoiceDetails from './InvoiceDetails.svelte';

  /** @type {import('/$types').PageData} */
  export let data: Invoice;

  //   $: invoice = getInvoice(data.id);
</script>

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
  <DetailHeader invoice={data} status={data.status} id={data.id} />
  <InvoiceDetails invoice={data} />
</div>
