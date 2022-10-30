<script lang="ts">
  import { activeStatuses, filteredInvoices } from '$lib/stores/InvoiceStore';
  import Plus from './icons/Plus.svelte';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import ArrowLeft from './icons/ArrowLeft.svelte';
  import InvoiceForm from './InvoiceForm.svelte';
  import FilterStatus from './FilterStatus.svelte';
  import Form from './FormTest.svelte';
  import FormTest from './FormTest.svelte';
  let isSidePanelShowing: boolean = false;
</script>

<header class="mb-8 flex items-center gap-4 text-black dark:text-white">
  <div class="mr-auto space-y-1 md:space-y-2">
    <h1 class="text-xl font-bold tracking-tight md:text-2xl md:tracking-tightest">Invoices</h1>
    <!-- TODO START -->

    {#if $filteredInvoices.length === 0}
      <p class="text-body-1 font-medium tracking-normal text-coolGrey dark:text-lavender md:hidden">
        No invoices
      </p>
    {:else if $activeStatuses.length}
      <!-- Clean up for different screensizes -->
      <p class="text-body-1 font-medium tracking-normal text-coolGrey dark:text-lavender md:hidden">
        {$filteredInvoices.length} invoices: {$activeStatuses.join(', ')}
      </p>
      <p
        class="hidden text-body-1 font-medium tracking-normal text-coolGrey dark:text-lavender md:block"
      >
        There are {$filteredInvoices.length} invoices with status: {$activeStatuses.join(', ')}
      </p>
    {:else}
      <!-- Clean up for different screensizes -->
      <p class="text-body-1 font-medium tracking-normal text-coolGrey dark:text-lavender md:hidden">
        {$filteredInvoices.length} invoices
      </p>
      <p
        class="hidden text-body-1 font-medium tracking-normal text-coolGrey dark:text-lavender md:block"
      >
        There are {$filteredInvoices.length} invoices in total
      </p>
    {/if}
    <!-- TODO END -->
  </div>
  <FilterStatus />
  <button
    on:click={() => (isSidePanelShowing = true)}
    class="flex items-center rounded-full bg-violet p-2 pr-4 text-body-1 font-bold tracking-normal text-white transition hover:bg-violet-light"
  >
    <div class="center mr-4 h-8 w-8 rounded-full bg-white">
      <Plus />
    </div>
    <p>New <span class="hidden md:inline">Invoice</span></p>
  </button>
</header>

{#if isSidePanelShowing}
  <SlidePanel
    on:closePanel={() => {
      console.log('close panel');
      isSidePanelShowing = false;
    }}
  >
    <button
      on:click={() => (isSidePanelShowing = false)}
      class="flex items-center
      gap-6 px-6 pt-24 text-body-1 font-bold tracking-normal text-black hover:text-grayishBlue dark:text-white dark:hover:text-coolGrey md:hidden"
    >
      <ArrowLeft />
      Go Back</button
    >
    <h1
      class="my-6 px-6 text-2xl font-bold tracking-tight text-black dark:text-white md:mt-0 md:px-14 md:pt-32 lg:pt-14 lg:pl-40"
    >
      New Invoice
    </h1>
    <!-- <InvoiceForm on:closePanel={() => (isSidePanelShowing = false)} /> -->
    <FormTest />
  </SlidePanel>
{/if}
