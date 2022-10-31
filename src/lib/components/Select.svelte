<script lang="ts">
  import { getContext } from 'svelte';
  export let label;
  export let name;
  export let grid: string = '';
  const { onBlur } = getContext('form');
</script>

<div class={`flex flex-col gap-y-2 ${grid}`}>
  <label
    class="text-body-1 font-medium tracking-normal text-grayishBlue dark:text-coolGrey"
    for={name}>{label}</label
  >
  <select
    {name}
    on:blur={onBlur}
    class="box-border block w-full cursor-pointer rounded-[4px] border-1 border-lavender py-4 pl-5 text-body-1 font-bold tracking-normal text-black caret-violet accent-violet focus:outline-none focus:ring-1 focus:ring-violet dark:border-darkBlue dark:bg-veryDarkBlue dark:text-white"
  >
    <slot />
  </select>
</div>

<style lang="postcss">
</style>
