<script lang="ts">
  export let style: 'primary' | 'secondary' | 'danger' = 'primary';
  export let label: string;
  export let onClick: () => void;
</script>

<button
  on:click|preventDefault={() => onClick()}
  class="rounded-full py-4 px-6 text-white"
  class:primary={style === 'primary'}
  class:secondary={style === 'secondary'}
  class:danger={style === 'danger'}
>
  {label}
</button>

<style lang="postcss">
</style>
