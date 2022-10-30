<script lang="ts">
  import { activeStatuses, filterInvoices, toggleStatus } from '$lib/stores/InvoiceStore';
  import ArrowDown from './icons/ArrowDown.svelte';

  const availableStatuses: InvoiceStatus[] = ['draft', 'pending', 'paid'];

  let isOpen = false;
</script>

<div class="relative">
  <button
    on:click={() => (isOpen = !isOpen)}
    class="flex items-center gap-4 text-body-1 font-bold tracking-normal"
  >
    <p>Filter <span class="hidden md:inline"> by status</span></p>
    <ArrowDown classes={isOpen ? 'rotate-180' : ''} />
  </button>
  {#if isOpen}
    <div
      class="shadow-filter-light absolute top-10 left-1/2 w-44 -translate-x-1/2 rounded-lg bg-white capitalize shadow-lg dark:bg-darkBlue dark:shadow-filter-dark"
    >
      <div class="flex flex-col gap-2 p-4">
        {#each availableStatuses as status}
          <label class="group flex items-center gap-2">
            <input
              on:change={() => {
                toggleStatus(status);
                filterInvoices();
                isOpen = false;
              }}
              checked={$activeStatuses.includes(status)}
              type="checkbox"
              value={status}
              class="h-4 w-4 rounded-sm border-1 border-transparent bg-lavender checked:bg-violet group-hover:border-violet checked:group-hover:bg-violet-light dark:bg-veryDarkBlue checked:dark:bg-violet"
            />
            <p class="text-body-1 font-bold tracking-normal text-black dark:text-white">{status}</p>
          </label>
        {/each}
      </div>
    </div>
  {/if}
</div>
