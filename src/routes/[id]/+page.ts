import { loadInvoices } from './../../lib/stores/InvoiceStore';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { invoices } from '$lib/stores/InvoiceStore';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  loadInvoices();
  const invoice = get(invoices).find((inv) => inv.id === params.id);

  if (!invoice) {
    throw error(404, 'Not found');
  }

  return invoice;
}
