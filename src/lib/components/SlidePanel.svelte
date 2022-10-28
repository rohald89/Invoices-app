<script lang="ts">
  import { fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import Portal from '$lib/components/Portal.svelte';
  import Overlay from '$lib/components/Overlay.svelte';

  const dispatch = createEventDispatcher();

  const closePanel = () => {
    dispatch('closePanel');
  };
</script>

<svelte:window
  on:keydown={(event) => {
    if (event.key === 'Escape') {
      closePanel();
    }
  }}
/>

<Portal>
  <Overlay zIndex="z-slidePanelOverlay" onOverlayClick={() => closePanel()} />
  <!-- px-6 pt-24 md:px-14 md:pt-32 lg:pt-14 lg:pl-40 -->
  <div
    transition:fly={{ x: -500, duration: 300 }}
    class="

    fixed top-0 left-0 z-slidePanel h-screen w-full overflow-y-scroll bg-white dark:bg-earie-black md:w-3/4 md:rounded-r-[20px] xl:w-1/2"
  >
    <slot />
  </div>
</Portal>
