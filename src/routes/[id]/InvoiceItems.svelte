<script lang="ts">
  import { centsToDollars } from '$lib/utils/amountHelpers';

  export let items: LineItem[];
</script>

<div class="items overflow-hidden rounded-lg">
  <div class="lineItems flex flex-col gap-6 bg-offWhite p-6 dark:bg-darkBlue">
    <div
      class="lineItem-header hidden text-body-1 font-medium tracking-normal text-grayishBlue dark:text-lavender md:grid"
    >
      <div class="lineItem-header__name">Item Name</div>
      <div class="lineItem-header__quantity">QTY.</div>
      <div class="lineItem-header__price">Price</div>
      <div class="lineItem-header__total">Total</div>
    </div>
    {#each items as item}
      <!-- TODO Cleaner way to do this for mobile vs >md screens -->
      <div class="flex items-center justify-between md:hidden">
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
      <div class="lineItem hidden md:grid">
        <p class="lineItem__name text-body-1 font-bold tracking-normal dark:text-white">
          {item.name}
        </p>
        <p
          class="lineItem__quantity text-body-1 font-bold tracking-normal text-grayishBlue dark:text-coolGrey"
        >
          {item.quantity}
        </p>
        <p
          class="lineItem__price text-body-1 font-bold tracking-normal text-grayishBlue dark:text-coolGrey"
        >
          {centsToDollars(item.price)}
        </p>
        <p class="lineItem__total text-body-1 font-bold tracking-normal dark:text-white">
          {centsToDollars(item.total)}
        </p>
      </div>
      <!-- TODO END -->
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

<style lang="postcss">
</style>
