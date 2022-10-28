<script lang="ts">
  import Plus from './icons/Plus.svelte';
  import ArrowDown from './icons/ArrowDown.svelte';

  export let numberOfInvoices: number;
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import ArrowLeft from './icons/ArrowLeft.svelte';
  import InvoiceForm from './InvoiceForm.svelte';
  let isSidePanelShowing: boolean = false;
</script>

<header class="mb-8 flex items-center gap-4 text-black dark:text-white">
  <div class="mr-auto space-y-1 md:space-y-2">
    <h1 class="text-xl font-bold tracking-tight md:text-2xl md:tracking-tightest">Invoices</h1>
    <!-- TODO START -->

    {#if numberOfInvoices === 0}
      <p class="text-body-1 font-medium tracking-normal text-coolGrey dark:text-lavender md:hidden">
        No invoices
      </p>
    {:else}
      <!-- Clean up for different screensizes -->
      <p class="text-body-1 font-medium tracking-normal text-coolGrey dark:text-lavender md:hidden">
        {numberOfInvoices} invoices
      </p>
      <p
        class="hidden text-body-1 font-medium tracking-normal text-coolGrey dark:text-lavender md:block"
      >
        There are {numberOfInvoices} total invoices
      </p>
    {/if}
    <!-- TODO END -->
  </div>
  <div class="flex items-center gap-3 text-body-1 font-bold tracking-normal">
    <p>Filter <span class="hidden md:inline"> by status</span></p>
    <ArrowDown />
  </div>
  <button
    on:click={() => (isSidePanelShowing = true)}
    class="flex items-center rounded-full bg-violet p-2 pr-4 text-body-1 font-bold tracking-normal text-white"
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
      isSidePanelShowing = false;
    }}
  >
    <button
      on:click={() => (isSidePanelShowing = false)}
      class="flex items-center gap-6 text-body-1 font-bold tracking-normal text-black dark:text-white md:hidden"
    >
      <ArrowLeft />
      Go Back</button
    >
    <h1 class="my-6 text-2xl font-bold tracking-tight text-black dark:text-white md:mt-0">
      New Invoice
    </h1>
    <InvoiceForm />
  </SlidePanel>
{/if}
