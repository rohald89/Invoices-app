<script lang="ts">
  import { invoices, loadInvoices } from '$lib/stores/InvoiceStore';
  import Invoices from '$lib/components/Invoices.svelte';
  import InvoicesHeader from '$lib/components/InvoicesHeader.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    loadInvoices();
  });
</script>

<InvoicesHeader numberOfInvoices={$invoices.length} />
<Invoices data={invoices} />
