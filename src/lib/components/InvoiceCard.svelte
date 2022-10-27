<script lang="ts">
  import { formatDate } from '$lib/utils/dateHelpers';
  import { centsToDollars } from '$lib/utils/amountHelpers';
  import StatusTag from './StatusTag.svelte';
  import ArrowRight from './icons/ArrowRight.svelte';

  export let invoice: Invoice;
</script>

<a
  href={invoice.id}
  class="invoice-card grid grid-cols-2 rounded-lg border-1 border-transparent bg-white p-6 text-body-1 font-medium tracking-normal text-black shadow-default transition hover:border-violet dark:bg-veryDarkBlue dark:text-white md:gap-5"
>
  <div class="invoice-id mb-6 font-bold md:mb-0">
    <span class="text-grayishBlue dark:text-coolGrey">#</span>{invoice.id}
  </div>
  <div class="invoice-due mb-2 tracking-tight text-grayishBlue dark:text-lavender md:mb-0">
    <span class="mr-1">Due</span>{formatDate(invoice.paymentDue)}
  </div>
  <div class="invoice-client justify-self-end text-darkGrayishBlue md:justify-self-start">
    {invoice.clientName}
  </div>
  <div class="invoice-total text-lg font-bold tracking-tighter md:justify-self-end">
    {centsToDollars(invoice.total)}
  </div>
  <div class="invoice-status justify-self-end md:justify-self-end">
    <StatusTag label={invoice.status} />
  </div>
  <ArrowRight />
</a>

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
      grid-template-columns: 3fr 4fr 4fr 4fr 4fr 10px;
    }

    .invoice-card > div {
      display: flex;
      align-items: center;
    }
  }
</style>
