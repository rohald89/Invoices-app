<script lang="ts">
  import InvoiceItems from './InvoiceItems.svelte';

  export let invoice: Invoice;
</script>

<div
  class="invoice-detail mb-20 grid gap-8 rounded-lg bg-white p-6 shadow-default dark:bg-veryDarkBlue"
>
  <div class="id">
    <p class="mb-1 text-body-1 font-bold tracking-normal dark:text-white">
      <span class="text-grayishBlue">#</span>{invoice.id}
    </p>
    <p class="text-body-1 font-medium tracking-normal text-grayishBlue dark:text-lavender">
      {invoice.description}
    </p>
  </div>
  <div class="sender text-body-2 font-medium tracking-normal text-grayishBlue dark:text-lavender">
    <p>{invoice.senderAddress.street}</p>
    <p>{invoice.senderAddress.city}</p>
    <p>{invoice.senderAddress.postCode}</p>
    <p>{invoice.senderAddress.country}</p>
  </div>
  <div class="dates space-y-8">
    <div class="invoice_date">
      <p class="mb-3 text-body-1 font-medium tracking-normal text-grayishBlue dark:text-lavender">
        Invoice Date
      </p>
      <p class="text-body-3 font-bold tracking-medium dark:text-white">{invoice.createdAt}</p>
    </div>
    <div class="due_date">
      <p class="mb-3 text-body-1 font-medium tracking-normal text-grayishBlue dark:text-lavender">
        Payment Due
      </p>
      <p class="text-body-3 font-bold tracking-medium dark:text-white">{invoice.paymentDue}</p>
    </div>
  </div>
  <div class="client">
    <p class="mb-3 text-body-1 font-medium tracking-normal text-grayishBlue dark:text-lavender">
      Bill To
    </p>
    <p class="mb-2 text-body-3 font-bold tracking-medium dark:text-white">{invoice.clientName}</p>
    <p class="text-body-2 font-medium tracking-normal text-grayishBlue dark:text-lavender">
      {invoice.clientAddress.street}
    </p>
    <p class="text-body-2 font-medium tracking-normal text-grayishBlue dark:text-lavender">
      {invoice.clientAddress.city}
    </p>
    <p class="text-body-2 font-medium tracking-normal text-grayishBlue dark:text-lavender">
      {invoice.clientAddress.postCode}
    </p>
    <p class="text-body-2 font-medium tracking-normal text-grayishBlue dark:text-lavender">
      {invoice.clientAddress.country}
    </p>
  </div>
  <div class="client-email">
    <p class="mb-3 text-body-1 font-medium tracking-normal text-grayishBlue dark:text-lavender">
      Send to
    </p>
    <p class="text-body-3 font-bold tracking-medium dark:text-white">{invoice.clientEmail}</p>
  </div>
  <div class="items">
    <InvoiceItems items={invoice.items} />
  </div>
</div>

<style lang="postcss">
  .invoice-detail {
    grid-template-areas:
      'id id'
      'sender sender'
      'dates client'
      'client-email client-email'
      'items items';
  }

  .id {
    grid-area: id;
  }

  .sender {
    grid-area: sender;
  }

  .dates {
    grid-area: dates;
  }

  .client {
    grid-area: client;
  }

  .client-email {
    grid-area: client-email;
  }

  .items {
    grid-area: items;
  }
</style>
