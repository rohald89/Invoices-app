<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import Button from './Button.svelte';
  import Delete from './icons/Delete.svelte';

  export let items: LineItem[] = [];
  export let updateItems: (items: LineItem[]) => void;

  const newLineItem = {
    name: '',
    quantity: 1,
    price: 1000,
    total: 1000
  };

  const addLineItem = () => {
    items = [
      ...items,
      {
        ...newLineItem,
        id: uuidv4()
      }
    ];
    updateItems(items);
  };

  const deleteLineItem = (id: string) => {
    items = items.filter((item) => item.id !== id);
    updateItems(items);
  };
  console.log(items);
</script>

<fieldset class="itemList mt-12 pb-6 text-black dark:text-white">
  <legend class="mb-4 text-[18px] font-bold tracking-tight text-[#777F98]">Item List</legend>
  <div class="itemList__grid hidden grid-cols-5 gap-4 md:grid">
    <div class="text-body-1 font-medium tracking-normal text-grayishBlue dark:text-coolGrey">
      Item Name
    </div>
    <div class="text-body-1 font-medium tracking-normal text-grayishBlue dark:text-coolGrey">
      Qty.
    </div>
    <div class="text-body-1 font-medium tracking-normal text-grayishBlue dark:text-coolGrey">
      Price
    </div>
    <div class="text-body-1 font-medium tracking-normal text-grayishBlue dark:text-coolGrey">
      Total
    </div>
    <div />
  </div>
  {#each items as lineItem}
    <div class="itemList__grid itemList__grid-item mt-12 grid grid-cols-5 gap-4 md:mt-4">
      <div class="col-span-4 flex flex-col gap-[10px] md:col-span-1">
        <label
          for={`item-name-${lineItem.id}`}
          class="text-body-1 font-medium tracking-normal text-grayishBlue dark:text-coolGrey md:hidden"
          >Item Name</label
        >
        <input
          class="box-border block w-full cursor-pointer rounded-[4px] border-1 border-lavender py-4 pl-5 text-body-1 font-bold tracking-normal text-black caret-violet accent-violet focus:outline-none focus:ring-1 focus:ring-violet dark:border-darkBlue dark:bg-veryDarkBlue dark:text-white"
          type="text"
          name={`item-name-${lineItem.id}`}
          bind:value={lineItem.name}
        />
      </div>
      <div class="flex flex-col gap-[10px]">
        <label
          for={`item-quantity-${lineItem.id}`}
          class="text-body-1 font-medium tracking-normal text-grayishBlue dark:text-coolGrey md:hidden"
          >Qty.</label
        >
        <input
          class="box-border block w-full cursor-pointer rounded-[4px] border-1 border-lavender py-4 pl-5 text-body-1 font-bold tracking-normal text-black caret-violet accent-violet focus:outline-none focus:ring-1 focus:ring-violet dark:border-darkBlue dark:bg-veryDarkBlue dark:text-white"
          type="text"
          name={`item-quantity-${lineItem.id}`}
          bind:value={lineItem.quantity}
        />
      </div>
      <div class="flex flex-col gap-[10px]">
        <label
          for={`item-price-${lineItem.id}`}
          class="text-body-1 font-medium tracking-normal text-grayishBlue dark:text-coolGrey md:hidden"
          >Price</label
        >
        <input
          class="box-border block w-full cursor-pointer rounded-[4px] border-1 border-lavender py-4 pl-5 text-body-1 font-bold tracking-normal text-black caret-violet accent-violet focus:outline-none focus:ring-1 focus:ring-violet dark:border-darkBlue dark:bg-veryDarkBlue dark:text-white"
          type="text"
          name={`item-price-${lineItem.id}`}
          bind:value={lineItem.price}
        />
      </div>
      <div class="flex flex-col gap-[10px]">
        <label
          for={`item-total-${lineItem.id}`}
          class="text-body-1 font-medium tracking-normal text-grayishBlue dark:text-coolGrey md:hidden"
          >Total</label
        >
        <input
          class="box-border block w-full cursor-pointer rounded-[4px] border-1 border-lavender py-4 pl-5 text-body-1 font-bold tracking-normal text-black caret-violet accent-violet focus:outline-none focus:ring-1 focus:ring-violet dark:border-darkBlue dark:bg-veryDarkBlue dark:text-white"
          disabled
          value={((lineItem.quantity * lineItem.price) / 100).toFixed(2)}
        />
      </div>
      <button
        type="button"
        on:click={() => deleteLineItem(lineItem.id)}
        class="mb-4 self-end justify-self-center text-coolGrey transition hover:text-red"
      >
        <Delete />
      </button>
    </div>
  {/each}
  <Button label="+ Add New Item" style="stealth" classes="w-full mt-4" onClick={addLineItem} />
</fieldset>

<style lang="postcss">
  .itemList__grid-item {
    grid-template-columns: 1fr 2fr 2fr 1fr;
  }

  @media (min-width: 768px) {
    .itemList__grid {
      grid-template-columns: 4fr 1fr 2fr 2fr 1fr;
      align-items: center;
    }

    .itemList__grid-item {
      grid-template-columns: 4fr 1fr 2fr 2fr 1fr;
      align-items: center;
      grid-template-areas: 'name quantity price total delete';
    }
  }
</style>
