<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Validators } from '$lib/utils/Validators';
  import Form from './Form.svelte';
  import Input from './Input.svelte';
  import Button from './Button.svelte';
  import LineItems from './LineItems.svelte';
  import DatePicker from './DatePicker.svelte';
  import Select from './Select.svelte';
  import { calculateDueDate, formatDateForInput } from '$lib/utils/dateHelpers';
  import { generateId } from '$lib/utils/invoiceHelpers';
  import { addInvoice, updateInvoice, invoices } from '$lib/stores/InvoiceStore';

  const dispatch = createEventDispatcher();

  let formEl;
  export let invoice: Invoice | null = null;

  let selectedDate = invoice ? new Date(invoice?.createdAt) : new Date();
  let items = invoice?.items || [
    {
      id: '1',
      name: '',
      quantity: 1,
      price: 1000,
      total: 1000
    }
  ];

  const updateItems = (updatedItems: LineItem[]) => {
    items = updatedItems;
  };

  let form = {
    'sender-street': {
      validators: [Validators.required]
    },
    'sender-city': {
      validators: [Validators.required]
    },
    'sender-postcode': {
      validators: [Validators.required]
    },
    'sender-country': {
      validators: [Validators.required]
    },
    'client-name': {
      validators: [Validators.required]
    },
    'client-email': {
      validators: [Validators.required]
    },
    'client-street': {
      validators: [Validators.required]
    },
    'client-city': {
      validators: [Validators.required]
    },
    'client-postcode': {
      validators: [Validators.required]
    },
    'client-country': {
      validators: [Validators.required]
    },
    description: {
      validators: [Validators.required]
    },
    paymentTerms: {
      validators: [Validators.required]
    },
    'invoice-date': {
      validators: [Validators.required]
    }
  };

  let invoiceStatus = invoice?.status || 'draft';

  const onSubmit = (e) => {
    console.log(e.detail);
    if (e?.detail?.valid) {
      const { invoiceData } = e.detail;
      invoiceData.status = invoiceStatus;
      invoiceData.createdAt = formatDateForInput(selectedDate);
      invoiceData.paymentTerms = +invoiceData.paymentTerms;
      invoiceData.paymentDue = calculateDueDate(invoiceData.createdAt, invoiceData.paymentTerms);
      invoiceData.items = items.map((item) => {
        return {
          ...item,
          quantity: +item.quantity,
          price: +item.price,
          total: +item.quantity * +item.price
        };
      });
      invoiceData.total = invoiceData.items.reduce((acc, item) => acc + item.total, 0);
      if (invoice?.id !== undefined) {
        console.log('updating', invoiceData);
        invoiceData.id = invoice.id;
        updateInvoice(invoiceData);
        console.log($invoices);
      } else {
        // determine which button has been clicked
        const button = e.target;
        console.log(button);
        console.log('adding', invoiceData);
        invoiceData.id = generateId();
        addInvoice(invoiceData);
      }
      dispatch('closePanel');
    } else {
      console.log('invalid form');
    }
  };
</script>

<Form {form} on:submit={onSubmit} bind:this={formEl}>
  <div
    class="overflow-scroll px-6 scrollbar scrollbar-track-transparent scrollbar-thumb-violet md:px-14 lg:pl-40"
  >
    <fieldset class="sender grid gap-6">
      <legend class="col-span-2 mb-6 text-body-1 font-bold tracking-normal text-violet"
        >Bill From</legend
      >
      <Input
        label="Street Address"
        name="sender-street"
        validation="required"
        message="Can't be empty"
        value={invoice?.senderAddress.street}
        grid="col-span-2 md:col-span-3"
      />
      <Input
        label="City"
        name="sender-city"
        validation="required"
        message="Required"
        value={invoice?.senderAddress.city}
      />
      <Input
        label="Post Code"
        name="sender-postcode"
        validation="required"
        message="Required"
        value={invoice?.senderAddress.postCode}
      />
      <Input
        label="Country"
        name="sender-country"
        validation="required"
        message="Required"
        value={invoice?.senderAddress.country}
        grid="col-span-2 md:col-span-1"
      />
    </fieldset>
    <fieldset class="receiver mt-12 grid gap-6">
      <legend class="col-span-2 mb-6 text-body-1 font-bold tracking-normal text-violet"
        >Bill From</legend
      >
      <Input
        label="Client's Name"
        name="client-name"
        validation="required"
        message="Can't be empty"
        value={invoice?.clientName}
        grid="grid-span-2 md:col-span-3"
      />
      <Input
        label="Client's Email"
        name="client-email"
        validation="required"
        message="Can't be empty"
        value={invoice?.clientEmail}
        grid="grid-span-2 md:col-span-3"
      />
      <Input
        label="Street Address"
        name="client-street"
        validation="required"
        message="Can't be empty"
        value={invoice?.clientAddress.street}
        grid="col-span-2 md:col-span-3"
      />
      <Input
        label="City"
        name="client-city"
        validation="required"
        message="Required"
        value={invoice?.clientAddress.city}
      />
      <Input
        label="Post Code"
        name="client-postcode"
        validation="required"
        message="Required"
        value={invoice?.clientAddress.postCode}
      />
      <Input
        label="Country"
        name="client-country"
        validation="required"
        message="Required"
        value={invoice?.clientAddress.country}
        grid="col-span-2 md:col-span-1"
      />
    </fieldset>

    <fieldset class="payment mt-12 grid gap-6">
      <DatePicker
        classes="col-span-1"
        onDateChange={(date) => (selectedDate = date)}
        {selectedDate}
      />
      <Select label="Payment Terms" name="payment-terms">
        <option value="1" selected={invoice?.paymentTerms === 1}>Net 1 Day</option>
        <option value="7" selected={invoice?.paymentTerms === 7}>Net 7 Days</option>
        <option value="14" selected={invoice?.paymentTerms === 14}>Net 14 Days</option>
        <option value="30" selected={invoice?.paymentTerms === 30}>Net 30 Days</option>
      </Select>
      <Input
        label="Project Description"
        name="description"
        validation="required"
        message="Required"
        value={invoice?.description}
        grid="md:col-span-2"
      />
    </fieldset>

    <LineItems {items} {updateItems} />
  </div>

  <div
    class="flex justify-center gap-2 py-5 px-6 shadow-buttons dark:bg-veryDarkBlue md:rounded-r-[20px] md:px-14 lg:pl-40 dark:lg:bg-transparent"
  >
    {#if invoice?.id === undefined}
      <Button
        onClick={() => dispatch('closePanel')}
        style="secondary"
        label="Discard"
        classes="md:mr-auto"
      />
      <Button
        onClick={() => dispatch('submit')}
        type="submit"
        style="tertiary"
        label="Save as Draft"
      />
      <Button type="submit" onClick={() => (invoiceStatus = 'pending')} label="Save & Send" />
    {:else}
      <Button
        onClick={() => dispatch('closePanel')}
        style="secondary"
        label="Cancel"
        classes="ml-auto"
      />
      <Button type="submit" onClick={() => {}} label="Save Changes" />
    {/if}
  </div></Form
>

<style lang="postcss">
  .sender,
  .receiver {
    @apply grid-cols-2 md:grid-cols-3;
  }
  .payment {
    @apply grid-cols-1 md:grid-cols-2;
  }
</style>
