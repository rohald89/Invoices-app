<script>
  import Sidebar from '../components/Sidebar.svelte';
  import '../app.css';
</script>

<div class="flex min-h-screen flex-col bg-white dark:bg-earie-black lg:flex-row">
  <Sidebar />
  <main class="flex-1">
    <slot />
  </main>
</div>
