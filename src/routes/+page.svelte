<script lang="ts">
  import { invoices } from '$lib/stores/InvoiceStore';
  import Invoices from '$lib/components/Invoices.svelte';
  import InvoicesHeader from '$lib/components/InvoicesHeader.svelte';
</script>

<InvoicesHeader numberOfInvoices={$invoices.length} />
<Invoices />
