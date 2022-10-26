<script lang="ts">
  import StatusTag from './StatusTag.svelte';

  export let invoice: Invoice;
  console.log(invoice);
</script>

<div
  class="invoice-card dark:shadow-darkInvoiceCard grid grid-cols-2 rounded-lg bg-white p-6 text-body-1 font-medium tracking-normal text-black shadow-lightInvoiceCard dark:bg-veryDarkBlue dark:text-white md:gap-6"
>
  <div class="invoice-id mb-6 font-bold md:mb-0">
    <span class="text-grayishBlue dark:text-coolGrey">#</span>{invoice.id}
  </div>
  <div class="invoice-due mb-2 text-grayishBlue dark:text-lavender md:mb-0">
    <span>Due</span>{invoice.paymentDue}
  </div>
  <div class="invoice-client justify-self-end text-darkGrayishBlue md:justify-self-start">
    {invoice.clientName}
  </div>
  <div class="invoice-total text-lg font-bold tracking-tighter md:justify-self-end">
    ${invoice.total}
  </div>
  <div class="invoice-status justify-self-end md:justify-self-auto">
    <StatusTag label={invoice.status} />
  </div>
</div>

<style lang="postcss">
  .invoice-card {
    grid-template-areas:
      'id client'
      'due status'
      'total status';
  }
  .invoice-id {
    grid-area: id;
  }
  .invoice-due {
    grid-area: due;
  }
  .invoice-client {
    grid-area: client;
  }
  .invoice-total {
    grid-area: total;
  }
  .invoice-status {
    grid-area: status;
  }

  @media (min-width: 768px) {
    .invoice-card {
      grid-template-areas: 'id due client total status';
      grid-template-columns: 3fr 4fr 4fr 4fr 4fr;
    }

    .invoice-card > div {
      display: flex;
      align-items: center;
    }
  }
</style>
