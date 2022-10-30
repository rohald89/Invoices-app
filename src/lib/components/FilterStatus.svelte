<script lang="ts">
  import { activeStatuses, filterInvoices, toggleStatus } from '$lib/stores/InvoiceStore';
  import ArrowDown from './icons/ArrowDown.svelte';

  const availableStatuses: InvoiceStatus[] = ['draft', 'pending', 'paid'];

  let isOpen = false;
</script>

<div class="relative">
  <button
    on:click={() => (isOpen = !isOpen)}
    class="flex items-center gap-3 text-body-1 font-bold tracking-normal"
  >
    <p>Filter <span class="hidden md:inline"> by status</span></p>
    <ArrowDown />
  </button>
  {#if isOpen}
    <div class="dark:bg-violetDark absolute top-12 left-0 w-56 rounded-lg bg-white shadow-lg">
      <div class="flex flex-col gap-2 p-4">
        {#each availableStatuses as status}
          <label class="flex items-center gap-2">
            <input
              on:change={() => {
                toggleStatus(status);
                filterInvoices();
                isOpen = false;
              }}
              checked={$activeStatuses.includes(status)}
              type="checkbox"
              value={status}
              class="dark:border-violetDark h-4 w-4 rounded-sm border border-grayishBlue"
            />
            <p class="text-body-1 font-medium tracking-normal">{status}</p>
          </label>
        {/each}
      </div>
    </div>
  {/if}
</div>
