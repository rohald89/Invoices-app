<script lang="ts">
  import type { InvoiceStatus } from 'src/enums';

  export let label: InvoiceStatus;
  console.log(label);
</script>

<div
  class="center h-10 w-[104px] rounded-md text-body-1 font-bold capitalize tracking-normal"
  class:draft={label === 'draft'}
  class:pending={label === 'pending'}
  class:paid={label === 'paid'}
>
  <div class="dot mr-2 h-2 w-2 rounded-full" />
  {label}
</div>

<style lang="postcss">
  .draft .dot {
    @apply bg-veryDarkGrayishBlue dark:bg-lavender;
  }

  .pending {
    @apply bg-statusOrange bg-opacity-[6%] text-statusOrange;
  }

  .pending .dot {
    @apply bg-statusOrange;
  }

  .paid {
    @apply bg-statusGreen bg-opacity-[6%] text-statusGreen;
  }
  .paid .dot {
    @apply bg-statusGreen;
  }
</style>
