<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import { addInvoice, updateInvoice } from '$lib/stores/InvoiceStore';
  import { calculateDueDate, formatDate, formatDateForInput } from '$lib/utils/dateHelpers';
  import { generateId } from '$lib/utils/invoiceHelpers';
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';
  import Delete from './icons/Delete.svelte';
  import { enhance } from '$app/forms';
  import DatePicker from './DatePicker.svelte';

  const dispatch = createEventDispatcher();

  export let invoice: Invoice = {
    id: '',
    createdAt: formatDateForInput(new Date()),
    paymentDue: '',
    description: '',
    paymentTerms: 1,
    clientName: '',
    clientEmail: '',
    status: 'draft',
    senderAddress: {
      street: '',
      city: '',
      postCode: '',
      country: ''
    },
    clientAddress: {
      street: '',
      city: '',
      postCode: '',
      country: ''
    },
    items: [
      {
        id: '',
        name: '',
        quantity: 1,
        price: 0,
        total: 0
      }
    ],
    total: 0
  };

  const newLineItem = {
    name: '',
    quantity: 1,
    price: 1000,
    total: 1000
  };

  const addLineItem = () => {
    invoice.items = [
      ...invoice.items,
      {
        ...newLineItem,
        id: uuidv4()
      }
    ];
  };

  const updateLineItem = (id: string, key: string, value: string) => {
    invoice.items = invoice.items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [key]: value
        };
      }
      return item;
    });
  };

  const deleteLineItem = (id: string) => {
    invoice.items = invoice.items.filter((item) => item.id !== id);
  };

  const sendInvoice = () => {
    invoice.id = generateId();
    invoice.paymentDue = calculateDueDate(new Date(invoice.createdAt), +invoice.paymentTerms);
    invoice.paymentTerms = +invoice.paymentTerms;
    invoice.items = invoice.items.map((item) => {
      return {
        ...item,
        quantity: +item.quantity,
        price: +item.price,
        total: +item.quantity * +item.price
      };
    });
    invoice.total = invoice.items.reduce((acc, item) => acc + item.total, 0);
    invoice.status = 'pending';
    addInvoice(invoice);
    dispatch('closePanel');
  };

  const saveDraft = () => {
    invoice.id = generateId();
    invoice.paymentTerms = +invoice.paymentTerms;
    invoice.paymentDue = calculateDueDate(new Date(invoice.createdAt), invoice.paymentTerms);
    invoice.items = invoice.items.map((item) => {
      return {
        ...item,
        quantity: +item.quantity,
        price: +item.price,
        total: +item.quantity * +item.price
      };
    });
    invoice.total = invoice.items.reduce((acc, item) => acc + item.total, 0);
    invoice.status = 'draft';
    addInvoice(invoice);
    dispatch('closePanel');
  };

  const handleUpdate = () => {
    invoice.paymentTerms = +invoice.paymentTerms;
    invoice.paymentDue = calculateDueDate(new Date(invoice.createdAt), invoice.paymentTerms);
    invoice.items = invoice.items.map((item) => {
      return {
        ...item,
        quantity: +item.quantity,
        price: +item.price,
        total: +item.quantity * +item.price
      };
    });
    invoice.total = invoice.items.reduce((acc, item) => acc + item.total, 0);
    updateInvoice(invoice);
    dispatch('closePanel');
  };
</script>

<form
  class="grid overflow-scroll "
  method="POST"
  action="?/create"
  use:enhance={({ form }) => {
    return async ({ result, update }) => {
      console.log('result', result);
      form.reset();
      update();
    };
  }}
>
  <div
    class="overflow-scroll px-6 scrollbar scrollbar-track-transparent scrollbar-thumb-violet md:px-14 lg:pl-40"
  >
    <fieldset class="sender grid gap-6">
      <legend class="col-span-2 mb-6 text-body-1 font-bold tracking-normal text-violet"
        >Bill From</legend
      >
      <!-- <InputField label="Street Address" bind:value={invoice.senderAddress.street} /> -->
      <div class="inputField inputField__sender-street">
        <label for="sender-street">Street Address</label>
        <input
          type="text"
          name="sender-street"
          id="sender-street"
          bind:value={invoice.senderAddress.street}
        />
      </div>
      <div class="inputField inputField__sender-city">
        <label for="sender-city">City</label>
        <input
          bind:value={invoice.senderAddress.city}
          type="text"
          name="sender-city"
          id="sender-city"
        />
      </div>
      <div class="inputField inputField__sender-postcode">
        <label for="sender-postcode">Post Code</label>
        <input
          bind:value={invoice.senderAddress.postCode}
          type="text"
          name="sender-postcode"
          id="sender-postcode"
        />
      </div>
      <div class="inputField inputField__sender-country">
        <label for="sender-country">Country</label>
        <input
          bind:value={invoice.senderAddress.country}
          type="text"
          name="sender-country"
          id="sender-country"
        />
      </div>
    </fieldset>
    <fieldset class="receiver mt-12 grid gap-6">
      <legend class="col-span-2 mb-6 text-body-1 font-bold tracking-normal text-violet"
        >Bill From</legend
      >
      <div class="inputField inputField__name">
        <label for="name">Client's Name</label>
        <input bind:value={invoice.clientName} type="text" name="name" id="name" />
      </div>
      <div class="inputField inputField__email">
        <label for="email">Client's Email</label>
        <input bind:value={invoice.clientEmail} type="text" name="email" id="email" />
      </div>
      <div class="inputField inputField__street">
        <label for="street">Street Address</label>
        <input bind:value={invoice.clientAddress.street} type="text" name="street" id="street" />
      </div>
      <div class="inputField inputField__city">
        <label for="city">City</label>
        <input bind:value={invoice.clientAddress.city} type="text" name="city" id="city" />
      </div>
      <div class="inputField inputField__postcode">
        <label for="postcode">Post Code</label>
        <input
          bind:value={invoice.clientAddress.postCode}
          type="text"
          name="postcode"
          id="postcode"
        />
      </div>
      <div class="inputField inputField__country">
        <label for="country">Country</label>
        <input bind:value={invoice.clientAddress.country} type="text" name="country" id="country" />
      </div>
    </fieldset>
    <fieldset class="payment mt-12 grid gap-6">
      <DatePicker
        classes="inputField__date"
        onDateChange={(date) => (invoice.createdAt = formatDateForInput(date))}
        selectedDate={new Date(invoice.createdAt)}
      />
      <div class="inputField inputField__terms">
        <!-- TODO create custom select for improved styling -->
        <label for="terms">Payment Terms</label>
        <!-- <input type="text" name="terms" id="terms" /> -->
        <select name="terms" id="terms" bind:value={invoice.paymentTerms}>
          <option value="1" selected={invoice.paymentTerms === 1}>Net 1 Day</option>
          <option value="7" selected={invoice.paymentTerms === 7}>Net 7 Days</option>
          <option value="14" selected={invoice.paymentTerms === 14}>Net 14 Days</option>
          <option value="30" selected={invoice.paymentTerms === 30}>Net 30 Days</option>
        </select>
      </div>
      <div class="inputField inputField__description">
        <label for="desc">Project Description</label>
        <input bind:value={invoice.description} type="text" name="desc" id="desc" />
      </div>
    </fieldset>
    <fieldset class="itemList mt-12 pb-6 text-black dark:text-white">
      <legend>Item List</legend>
      <div class="itemList__grid hidden grid-cols-5 gap-4 md:grid">
        <div class="itemList__header__name">Item Name</div>
        <div class="itemList__header__quantity">Qty.</div>
        <div class="itemList__header__price">Price</div>
        <div class="itemList__header__total">Total</div>
        <div />
      </div>
      {#each invoice.items as lineItem}
        <div class="itemList__grid itemList__grid-item mt-12 grid grid-cols-5 gap-4 md:mt-4">
          <div class="itemList__item__name inputField">
            <label for={`item-name-${lineItem.id}`} class="md:hidden">Item Name</label>
            <input
              type="text"
              name={`item-name-${lineItem.id}`}
              value={lineItem.name}
              on:input={(e) => updateLineItem(lineItem.id, 'name', e.target.value)}
            />
          </div>
          <div class="itemList__item__quantity inputField">
            <label for={`item-quantity-${lineItem.id}`} class="md:hidden">Qty.</label>
            <input
              type="text"
              name={`item-quantity-${lineItem.id}`}
              value={lineItem.quantity}
              on:input={(e) => updateLineItem(lineItem.id, 'quantity', e.target.value)}
            />
          </div>
          <div class="itemList__item__price inputField">
            <label for={`item-price-${lineItem.id}`} class="md:hidden">Price</label>
            <input
              type="text"
              name={`item-price-${lineItem.id}`}
              value={lineItem.price}
              on:input={(e) => updateLineItem(lineItem.id, 'price', e.target.value)}
            />
          </div>
          <div class="itemList__item__total inputField">
            <label for={`item-total-${lineItem.id}`} class="md:hidden">Total</label>
            <input disabled value={((lineItem.quantity * lineItem.price) / 100).toFixed(2)} />
          </div>
          <button
            type="button"
            on:click={() => deleteLineItem(lineItem.id)}
            class="itemList__item__delete text-coolGrey transition hover:text-red"
          >
            <Delete />
          </button>
        </div>
      {/each}
      <Button label="+ Add New Item" style="stealth" classes="w-full mt-4" onClick={addLineItem} />
    </fieldset>
    <!-- TODO -->
  </div>
  <div
    class="flex justify-center gap-2 py-5 px-6 shadow-buttons dark:bg-veryDarkBlue md:rounded-r-[20px] md:px-14 lg:pl-40 dark:lg:bg-transparent"
  >
    {#if invoice.id === ''}
      <Button
        onClick={() => dispatch('closePanel')}
        style="secondary"
        label="Discard"
        classes="md:mr-auto"
      />
      <Button onClick={saveDraft} style="tertiary" label="Save as Draft" />
      <Button onClick={sendInvoice} label="Save & Send" />
    {:else}
      <Button
        onClick={() => dispatch('closePanel')}
        style="secondary"
        label="Cancel"
        classes="ml-auto"
      />
      <Button type="submit" onClick={handleUpdate} label="Save Changes" />
    {/if}
  </div>
</form>

<style lang="postcss">
  .sender {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'sender-street sender-street'
      'sender-city sender-postcode'
      'sender-country sender-country';
  }
  .inputField {
    @apply flex flex-col gap-[10px];
  }
  .inputField label {
    @apply text-body-1 font-medium tracking-normal text-grayishBlue dark:text-coolGrey;
  }

  .inputField input,
  .inputField select {
    @apply box-border block w-full cursor-pointer rounded-[4px] border-1 border-lavender py-4 pl-5 text-body-1 font-bold tracking-normal text-black caret-violet accent-violet focus:outline-none focus:ring-1 focus:ring-violet dark:border-darkBlue dark:bg-veryDarkBlue dark:text-white;
  }

  .inputField__sender-city {
    grid-area: sender-city;
  }
  .inputField__sender-postcode {
    grid-area: sender-postcode;
  }
  .inputField__sender-country {
    grid-area: sender-country;
  }

  @media (min-width: 768px) {
    .sender {
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas:
        'sender-street sender-street sender-street'
        'sender-city sender-postcode sender-country';
    }
  }

  .receiver {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'name name'
      'email email'
      'street street'
      'city postcode'
      'country country';
  }
  .receiver .inputField__name {
    grid-area: name;
  }
  .receiver .inputField__email {
    grid-area: email;
  }
  .receiver .inputField__street {
    grid-area: street;
  }
  .receiver .inputField__city {
    grid-area: city;
  }
  .receiver .inputField__postcode {
    grid-area: postcode;
  }
  .receiver .inputField__country {
    grid-area: country;
  }

  @media (min-width: 768px) {
    .receiver {
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas:
        'name name name'
        'email email email'
        'street street street'
        'city postcode country';
    }
  }

  .payment {
    grid-template-columns: 1fr;
    grid-template-areas:
      'date'
      'terms'
      'desc';
  }

  .payment .inputField__terms {
    grid-area: terms;
  }
  .payment .inputField__description {
    grid-area: desc;
  }

  @media (min-width: 768px) {
    .payment {
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas:
        'date terms'
        'desc desc';
    }
  }

  .itemList__grid-item {
    grid-template-columns: 1fr 2fr 2fr 1fr;
    grid-template-areas:
      'name name name name'
      'quantity price total delete';
  }

  .itemList__item__name {
    grid-area: name;
  }
  .itemList__item__quantity {
    grid-area: quantity;
  }
  .itemList__item__price {
    grid-area: price;
  }
  .itemList__item__total {
    grid-area: total;
  }
  .itemList__item__delete {
    grid-area: delete;
    align-self: end;
    justify-self: center;
    margin-bottom: 18px;
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
