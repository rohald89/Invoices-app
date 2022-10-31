<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import FormTest from '$lib/components/FormTest.svelte';
  import ArrowLeft from '$lib/components/icons/ArrowLeft.svelte';
  import InvoiceForm from '$lib/components/InvoiceForm.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import StatusTag from '$lib/components/StatusTag.svelte';
  import { changeStatus, deleteInvoice, invoices } from '$lib/stores/InvoiceStore';

  export let status: InvoiceStatus;
  let isModalShowing: boolean = false;
  let isEditPanelShowing: boolean = false;
  export let id = '';
  export let invoice: Invoice;

  const handleDelete = () => {
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
        isEditPanelShowing = true;
      }}
    />
    <Button label="Delete" style="danger" onClick={handleDelete} />
    {#if status === 'draft'}
      <Button
        label="Send Invoice"
        onClick={() => {
          changeStatus(id, 'pending');
          status = 'pending';
        }}
      />
    {:else if status === 'pending'}
      <Button
        label="Mark as Paid"
        onClick={() => {
          changeStatus(id, 'paid');
          status = 'paid';
        }}
      />
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
    <Button label="Delete" onClick={() => deleteInvoice(id)} style="danger" />
  </div>
</Modal>

{#if isEditPanelShowing}
  <SlidePanel isVisible={isEditPanelShowing} on:closePanel={() => (isEditPanelShowing = false)}>
    <button
      on:click={() => (isEditPanelShowing = false)}
      class="flex items-center
    gap-6 px-6 pt-24 text-body-1 font-bold tracking-normal text-black dark:text-white md:hidden"
    >
      <ArrowLeft />
      Go Back</button
    >
    <h1
      class="my-6 px-6 text-2xl font-bold tracking-tight text-black dark:text-white md:mt-0 md:px-14 md:pt-32 lg:pt-14 lg:pl-40"
    >
      Edit <span class="text-coolGrey">#</span>{id}
    </h1>
    <!-- <InvoiceForm {invoice} on:closePanel={() => (isEditPanelShowing = false)} /> -->
    <FormTest {invoice} on:closePanel={() => (isEditPanelShowing = false)} />
  </SlidePanel>
{/if}
