<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import StatusTag from '$lib/components/StatusTag.svelte';
  import type { InvoiceStatus } from 'src/enums';
  //   export let status: 'paid' | 'pending' | 'draft';
  export let status: InvoiceStatus;
  let isModalShowing = false;
  export let id = '';

  const handleDelete = () => {
    console.log('delete');
    isModalShowing = true;
  };
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
    <Button
      label="Edit"
      style="secondary"
      onClick={() => {
        console.log(id);
      }}
    />
    <Button label="Delete" style="danger" onClick={handleDelete} />
    {#if status === 'draft'}
      <Button label="Send Invoice" onClick={() => {}} />
    {:else if status === 'pending'}
      <Button label="Mark as Paid" onClick={() => {}} />
    {/if}
  </div>
</header>

<Modal isVisible={isModalShowing} on:close={() => (isModalShowing = false)}>
  <h1 class="text-xl font-bold dark:text-white">Confirm Deletion</h1>
  <p class="mb-6 mt-2 text-body-1 font-medium leading-5 tracking-normal text-coolGrey">
    Are you sure you want to delete invoice #{id}? This action cannot be undone.
  </p>
  <div class="flex justify-end gap-2">
    <Button
      label="Cancel"
      onClick={() => {
        isModalShowing = false;
      }}
      style="secondary"
    />
    <Button label="Delete" onClick={() => {}} style="danger" />
  </div>
</Modal>
