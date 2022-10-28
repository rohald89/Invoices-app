<script lang="ts">
  import Plus from './icons/Plus.svelte';
  import ArrowDown from './icons/ArrowDown.svelte';

  export let numberOfInvoices: number;
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import ArrowLeft from './icons/ArrowLeft.svelte';
  let isSidePanelShowing: boolean = false;
</script>

<header class="mb-8 flex items-center gap-4 text-black dark:text-white">
  <div class="mr-auto space-y-1 md:space-y-2">
    <h1 class="text-xl font-bold tracking-tight md:text-2xl md:tracking-tightest">Invoices</h1>
    <!-- TODO START -->

    {#if numberOfInvoices === 0}
      <p class="text-body-1 font-medium tracking-normal text-coolGrey dark:text-lavender md:hidden">
        No invoices
      </p>
    {:else}
      <!-- Clean up for different screensizes -->
      <p class="text-body-1 font-medium tracking-normal text-coolGrey dark:text-lavender md:hidden">
        {numberOfInvoices} invoices
      </p>
      <p
        class="hidden text-body-1 font-medium tracking-normal text-coolGrey dark:text-lavender md:block"
      >
        There are {numberOfInvoices} total invoices
      </p>
    {/if}
    <!-- TODO END -->
  </div>
  <div class="flex items-center gap-3 text-body-1 font-bold tracking-normal">
    <p>Filter <span class="hidden md:inline"> by status</span></p>
    <ArrowDown />
  </div>
  <button
    on:click={() => (isSidePanelShowing = true)}
    class="flex items-center rounded-full bg-violet p-2 pr-4 text-body-1 font-bold tracking-normal text-white"
  >
    <div class="center mr-4 h-8 w-8 rounded-full bg-white">
      <Plus />
    </div>
    <p>New <span class="hidden md:inline">Invoice</span></p>
  </button>
</header>

{#if isSidePanelShowing}
  <SlidePanel
    on:closePanel={() => {
      isSidePanelShowing = false;
    }}
  >
    <button
      on:click={() => (isSidePanelShowing = false)}
      class="flex items-center gap-6 text-body-1 font-bold tracking-normal text-black dark:text-white md:hidden"
    >
      <ArrowLeft />
      Go Back</button
    >

    <h1 class="my-6 text-2xl font-bold tracking-tight text-black dark:text-white md:mt-0">
      New Invoice
    </h1>
    <form action="">
      <fieldset class="sender grid gap-6">
        <legend class="col-span-2 mb-6 text-body-1 font-bold tracking-normal text-violet"
          >Bill From</legend
        >
        <div class="inputField inputField__sender-street">
          <label for="sender-street">Street Address</label>
          <input type="text" name="sender-street" id="sender-street" />
        </div>
        <div class="inputField inputField__sender-city">
          <label for="sender-city">City</label>
          <input type="text" name="sender-city" id="sender-city" />
        </div>
        <div class="inputField inputField__sender-postcode">
          <label for="sender-postcode">Post Code</label>
          <input type="text" name="sender-postcode" id="sender-postcode" />
        </div>
        <div class="inputField inputField__sender-country">
          <label for="sender-country">Country</label>
          <input type="text" name="sender-country" id="sender-country" />
        </div>
      </fieldset>
      <fieldset class="receiver mt-12 grid gap-6">
        <legend class="col-span-2 mb-6 text-body-1 font-bold tracking-normal text-violet"
          >Bill From</legend
        >
        <div class="inputField inputField__name">
          <label for="street">Client's Name</label>
          <input type="text" name="street" id="street" />
        </div>
        <div class="inputField inputField__email">
          <label for="street">Client's Email</label>
          <input type="text" name="street" id="street" />
        </div>
        <div class="inputField inputField__street">
          <label for="street">Street Address</label>
          <input type="text" name="street" id="street" />
        </div>
        <div class="inputField inputField__city">
          <label for="city">City</label>
          <input type="text" name="city" id="city" />
        </div>
        <div class="inputField inputField__postcode">
          <label for="postcode">Post Code</label>
          <input type="text" name="postcode" id="postcode" />
        </div>
        <div class="inputField inputField__country">
          <label for="country">Country</label>
          <input type="text" name="country" id="country" />
        </div>
      </fieldset>
      <fieldset class="payment mt-12 grid gap-6">
        <div class="inputField inputField__date">
          <label for="date">Invoice Date</label>
          <input type="date" name="date" id="date" />
        </div>
        <div class="inputField inputField__terms">
          <label for="terms">Payment Terms</label>
          <input type="text" name="terms" id="terms" />
        </div>
        <div class="inputField inputField__description">
          <label for="desc">Project Description</label>
          <input type="text" name="desc" id="desc" />
        </div>
      </fieldset>
    </form>
  </SlidePanel>
{/if}

<style lang="postcss">
  .sender {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'sender-street sender-street'
      'sender-city sender-postcode'
      'sender-country sender-country';
  }
  .inputField {
    @apply flex flex-col gap-[10px];
  }
  .inputField label {
    @apply block text-body-1 font-medium tracking-normal text-grayishBlue dark:text-coolGrey;
  }

  .inputField input {
    @apply box-border block w-full cursor-pointer rounded-[4px] border-1 border-lavender py-4 px-5 text-body-1 font-bold tracking-normal text-black caret-violet focus:outline-none focus:ring-1 focus:ring-violet dark:border-darkBlue dark:bg-veryDarkBlue dark:text-white;
  }

  .inputField__sender-street {
    grid-area: sender-street;
  }
  .inputField__sender-city {
    grid-area: sender-city;
  }
  .inputField__sender-postcode {
    grid-area: sender-postcode;
  }
  .inputField__sender-country {
    grid-area: sender-country;
  }

  @media (min-width: 768px) {
    .sender {
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas:
        'sender-street sender-street sender-street'
        'sender-city sender-postcode sender-country';
    }
  }

  .receiver {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'name name'
      'email email'
      'street street'
      'city postcode'
      'country country';
  }
  .receiver .inputField__name {
    grid-area: name;
  }
  .receiver .inputField__email {
    grid-area: email;
  }
  .receiver .inputField__street {
    grid-area: street;
  }
  .receiver .inputField__city {
    grid-area: city;
  }
  .receiver .inputField__postcode {
    grid-area: postcode;
  }
  .receiver .inputField__country {
    grid-area: country;
  }

  @media (min-width: 768px) {
    .receiver {
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas:
        'name name name'
        'email email email'
        'street street street'
        'city postcode country';
    }
  }

  .payment {
    grid-template-columns: 1fr;
    grid-template-areas:
      'date'
      'terms'
      'desc';
  }
  .payment .inputField__date {
    grid-area: date;
  }
  .payment .inputField__terms {
    grid-area: terms;
  }
  .payment .inputField__description {
    grid-area: desc;
  }

  @media (min-width: 768px) {
    .payment {
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas:
        'date terms'
        'desc desc';
    }
  }
</style>
