<script>
  import Sidebar from '../components/Sidebar.svelte';
  import '../app.css';
</script>

<div class="flex min-h-screen flex-col bg-offWhite dark:bg-earie-black lg:flex-row">
  <Sidebar />
  <main class="flex-1 py-8 px-6 md:px-12 md:py-14 lg:mx-auto lg:max-w-3xl lg:py-18 lg:px-0">
    <slot />
  </main>
</div>
