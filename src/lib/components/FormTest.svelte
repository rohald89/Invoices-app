<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Validators } from '$lib/utils/Validators';
  import Form from './Form.svelte';
  import Input from './Input.svelte';
  import Button from './Button.svelte';

  const dispatch = createEventDispatcher();

  let formEl;

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
    }
  };

  const onSubmit = (e) => {
    if (e?.detail?.valid) {
      console.log(e.detail.data);
      setTimeout(() => formEl.reset(), 1000);
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
        grid="col-span-2 md:col-span-3"
      />
      <Input label="City" name="sender-city" validation="required" message="Can't be empty" />
      <Input
        label="Post Code"
        name="sender-postcode"
        validation="required"
        message="Can't be empty"
      />
      <Input
        label="Country"
        name="sender-country"
        validation="required"
        message="Can't be empty"
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
        grid="grid-span-2 md:col-span-3"
      />
      <Input
        label="Client's Email"
        name="client-email"
        validation="required"
        message="Can't be empty"
        grid="grid-span-2 md:col-span-3"
      />
      <Input
        label="Street Address"
        name="client-street"
        validation="required"
        message="Can't be empty"
        grid="col-span-2 md:col-span-3"
      />
      <Input label="City" name="client-city" validation="required" message="Can't be empty" />
      <Input
        label="Post Code"
        name="client-postcode"
        validation="required"
        message="Can't be empty"
      />
      <Input
        label="Country"
        name="client-country"
        validation="required"
        message="Can't be empty"
        grid="col-span-2 md:col-span-1"
      />
    </fieldset>
  </div>

  <div
    class="flex justify-center gap-2 py-5 px-6 shadow-buttons dark:bg-veryDarkBlue md:rounded-r-[20px] md:px-14 lg:pl-40 dark:lg:bg-transparent"
  >
    <Button
      onClick={() => dispatch('closePanel')}
      style="secondary"
      label="Discard"
      classes="md:mr-auto"
    />
    <Button onClick={() => {}} style="tertiary" label="Save as Draft" />
    <Button onClick={() => {}} label="Save & Send" />
    <button>submit</button>
  </div></Form
>

<style lang="postcss">
  .sender,
  .receiver {
    @apply grid-cols-2 md:grid-cols-3;
  }
</style>
