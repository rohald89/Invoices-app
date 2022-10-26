<script lang="ts">
  import { browser } from '$app/environment';
  import Moon from './icons/Moon.svelte';
  import Sun from './icons/Sun.svelte';

  let darkMode = true;

  const toggleTheme = () => {
    darkMode = !darkMode;
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  };

  if (browser) {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.body.classList.add('dark');
      darkMode = true;
    } else {
      document.body.classList.remove('dark');
      darkMode = false;
    }
  }
</script>

<button
  on:click={toggleTheme}
  class="mx-6 text-grayishBlue transition hover:text-lavender lg:mx-auto lg:mb-7"
>
  {#if darkMode}
    <Sun />
  {:else}
    <Moon />
  {/if}
</button>
