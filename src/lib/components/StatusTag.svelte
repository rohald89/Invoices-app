<script lang="ts">
  export let label: 'draft' | 'pending' | 'paid';
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
  .draft {
    @apply bg-veryDarkGrayishBlue bg-opacity-[6%] text-veryDarkGrayishBlue dark:bg-lavender dark:text-lavender;
  }
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
