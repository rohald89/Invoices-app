<script>
  import { goto } from '$app/navigation';
  import Button from './Button.svelte';
  import Empty from './icons/Empty.svelte';
</script>

<div
  class="mx-auto flex max-w-[250px] flex-col items-center justify-center gap-6 text-black dark:text-offWhite"
>
  <Empty />
  <h1 class="text-xl font-bold tracking-tight text-black dark:text-offWhite">
    There is nothing here
  </h1>
  <Button label="Bring me Back" onClick={() => goto('/')} />
</div>
