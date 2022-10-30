<script lang="ts">
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

  const isFormValid = (): boolean => {
    return !Object.values(errors).some((field) =>
      Object.values(field).some((errorObject: ValidatorResult) => errorObject.error)
    );
  };

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

    return dispatch('submit', { valid: isFormValid(), data });
  };

  export const reset = () => {
    formEl.reset();
  };

  setContext('form', { errors, onBlur });
</script>

<form class="grid overflow-scroll" on:submit|preventDefault={onSubmit} bind:this={formEl}>
  <slot />
</form>
