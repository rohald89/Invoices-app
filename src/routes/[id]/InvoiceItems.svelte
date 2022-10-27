<script lang="ts">
  import { centsToDollars } from '$lib/utils/amountHelpers';

  export let items: LineItem[];
</script>

<div class="items overflow-hidden rounded-lg">
  <div class="lineItems flex flex-col gap-6 bg-offWhite p-6 dark:bg-darkBlue">
    {#each items as item}
      <div class="flex items-center justify-between">
        <div class="space-y-2">
          <p class="text-body-1 font-bold tracking-normal dark:text-white">{item.name}</p>
          <p class="text-body-1 font-bold tracking-normal text-grayishBlue dark:text-coolGrey">
            {item.quantity} x {centsToDollars(item.price)}
          </p>
        </div>
        <p class="text-body-1 font-bold tracking-normal dark:text-white">
          {centsToDollars(item.total)}
        </p>
      </div>
    {/each}
  </div>
  <div
    class=" flex items-center justify-between bg-veryDarkGrayishBlue p-6 text-white dark:bg-black"
  >
    <p class="text-body-2 font-medium tracking-normal">Grand Total</p>
    <p class="text-xl font-bold leading-8 tracking-medium">
      {centsToDollars(items.reduce((acc, item) => acc + item.total, 0))}
    </p>
  </div>
</div>
