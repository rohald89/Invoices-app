<script lang="ts">
  // https://www.thisdot.co/blog/handling-forms-in-svelte
  import { setContext } from 'svelte';
  import type { ValidatorFN, ValidatorResult } from '$lib/utils/Validators';
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';

  export let form: {
    [inputName: string]: {
      validators: ValidatorFN[];
    };
  };

  let formEl;

  const dispatch = createEventDispatcher();
  let errors = writable({});

  const onBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  function isFormValid(): boolean {
    return !Object.values($errors).some((field) =>
      Object.values(field).some((errorObject: ValidatorResult) => errorObject.error)
    );
  }

  const validateField = (field, value) => {
    form[field]?.validators &&
      form[field].validators.forEach((fn) => {
        const error = fn(value);
        errors.update((e) => {
          e[field] = { ...e[field], ...error };
          return e;
        });
      });
  };

  function validateForm(data: { [inputName: string]: any }): void {
    Object.keys(data).forEach((field) => validateField(field, data[field]));
  }

  const onSubmit = (e) => {
    const formData = new FormData(e.target);

    const data: any = {};
    for (const [key, value] of formData) {
      data[key] = value;
    }

    validateForm(data);

    const invoiceData = {
      status: 'draft',
      senderAddress: {
        street: data['sender-street'],
        city: data['sender-city'],
        postCode: data['sender-postcode'],
        country: data['sender-country']
      },
      clientName: data['client-name'],
      clientEmail: data['client-email'],
      clientAddress: {
        street: data['client-street'],
        city: data['client-city'],
        postCode: data['client-postcode'],
        country: data['client-country']
      },
      createdAt: data['created-at'],
      paymentDue: data['payment-due'],
      description: data['description'],
      paymentTerms: data['payment-terms'],
      items: data['line-items'],
      total: data['total']
    };
    console.log(invoiceData);

    return dispatch('submit', { valid: isFormValid(), invoiceData });
  };

  export const reset = () => {
    formEl.reset();
  };

  setContext('form', { errors, onBlur });
</script>

<form class="grid overflow-scroll" on:submit|preventDefault={onSubmit} bind:this={formEl}>
  <slot />
</form>
