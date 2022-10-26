<script>
  import Plus from '../components/icons/Plus.svelte';
  import ArrowDown from '../components/icons/ArrowDown.svelte';
</script>

<header class="flex items-center gap-4 text-black dark:text-white">
  <div class="mr-auto space-y-1 md:space-y-2">
    <h1 class="text-xl font-bold tracking-tight md:text-2xl md:tracking-tightest">Invoices</h1>
    <!-- TODO START -->
    <!-- Clean up for different screensizes -->
    <p class="text-body-1 font-medium tracking-normal text-coolGrey dark:text-lavender md:hidden">
      X invoices
    </p>
    <p
      class="hidden text-body-1 font-medium tracking-normal text-coolGrey dark:text-lavender md:block"
    >
      There are X total invoices
    </p>
    <!-- TODO END -->
  </div>
  <div class="flex items-center gap-3 text-body-1 font-bold tracking-normal">
    <p>Filter <span class="hidden md:inline"> by status</span></p>
    <ArrowDown />
  </div>
  <button
    class="flex items-center rounded-full bg-violet p-2 pr-4 text-body-1 font-bold tracking-normal text-white"
  >
    <div class="center mr-4 h-8 w-8 rounded-full bg-white">
      <Plus />
    </div>
    <p>New <span class="hidden md:inline">Invoice</span></p>
  </button>
</header>
