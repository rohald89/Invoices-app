<script lang="ts">
  import { getContext } from 'svelte';
  const { errors } = getContext('form');
  export let type = 'text';

  export let message: string | null = null;
  export let label;
  export let name;
  export let value: string | null = null;
  export let validation;
  export let grid: string = '';
  const { onBlur } = getContext('form');
</script>

<div class={`flex flex-col gap-y-2 ${grid}`}>
  <div class="flex flex-wrap justify-between">
    <label
      class="text-body-1 font-medium tracking-normal text-grayishBlue dark:text-coolGrey"
      for={name}>{label}</label
    >
    {#if $errors?.[name]?.[validation]?.error}
      <p class="text-body-2 font-semibold text-red">{message}</p>
    {/if}
  </div>
  <input
    class="box-border block w-full cursor-pointer rounded-[4px] border-1 border-lavender py-4 pl-5 text-body-1 font-bold tracking-normal text-black caret-violet accent-violet focus:outline-none focus:ring-1 focus:ring-violet dark:border-darkBlue dark:bg-veryDarkBlue dark:text-white"
    {name}
    {value}
    {type}
    on:blur={onBlur}
  />
</div>
