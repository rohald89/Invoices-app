<script lang="ts">
  import Logo from './Logo.svelte';
  import ThemeToggle from './ThemeToggle.svelte';
</script>

<aside class="flex bg-veryDarkGrayishBlue dark:bg-veryDarkBlue lg:flex-col lg:rounded-r-[20px]">
  <Logo />
  <ThemeToggle />
  <div class="center border-l-1 border-[#494E6E] px-8 lg:border-l-0 lg:border-t-1 lg:px-0 lg:py-6">
    <img src="/images/avatar.jpg" alt="avatar" class="h-8 w-8 rounded-full lg:h-10 lg:w-10" />
  </div>
</aside>
