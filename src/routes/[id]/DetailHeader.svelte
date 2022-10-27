<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import StatusTag from '$lib/components/StatusTag.svelte';
  import type { InvoiceStatus } from 'src/enums';
  //   export let status: 'paid' | 'pending' | 'draft';
  export let status: InvoiceStatus;
  export let id = '';
</script>

<header
  class="flex items-center justify-between gap-4 rounded-lg bg-white p-6 text-body-1 font-medium tracking-normal text-darkGrayishBlue shadow-default dark:bg-veryDarkBlue dark:text-lavender "
>
  <p class="">Status</p>
  <StatusTag label={status} />

  <!-- <div class="flex gap-2 md:ml-auto"> -->
  <div
    class="fixed bottom-0 left-0 right-0 flex justify-center gap-2 bg-white py-5 px-6
    dark:bg-veryDarkBlue md:static md:ml-auto md:p-0"
  >
    <Button label="Edit" style="secondary" onClick={() => {}} />
    <Button label="Delete" style="danger" onClick={() => {}} />
    <Button label="Mark as Paid" onClick={() => {}} />
  </div>
</header>
