<script lang="ts">
  export let style: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'stealth' = 'primary';
  export let label: string;
  export let classes: string = '';
  export let type: string = 'button';
  export let onClick: () => void;
</script>

<button
  {type}
  on:click={() => onClick()}
  class={`${classes} rounded-full py-4 px-4 text-sm font-bold tracking-normal text-white transition md:px-6`}
  class:primary={style === 'primary'}
  class:secondary={style === 'secondary'}
  class:tertiary={style === 'tertiary'}
  class:danger={style === 'danger'}
  class:stealth={style === 'stealth'}
>
  {label}
</button>

<style lang="postcss">
</style>
