import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { invoices } from '$lib/stores/InvoiceStore';
export const csr = true;
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const invoice = get(invoices).find((inv) => inv.id === params.id);
    if (!invoice) {
        return error(404, 'Invoice not found');
    }
    return invoice
}

// export function load({ params }) {
//   const inv = get(invoices).find((inv) => inv.id === params.id);
//   if (!inv) {
//     return error(404, 'Invoice not found');
//   }
//   return inv
// }
