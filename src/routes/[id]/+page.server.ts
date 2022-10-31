// import { error } from '@sveltejs/kit';
// import { get } from 'svelte/store';
// import { filteredInvoices } from '$lib/stores/InvoiceStore';

// /** @type {import('./$types').PageLoad} */
// export async function load({ params }) {
//   const invoice = get(filteredInvoices).find((inv) => inv.id === params.id);
//   if (!invoice) {
//     return error(404, 'Invoice not found');
//   }
//   return invoice;
// }
// /** @type {import('./$types').Actions} */
// export const actions = {
//   default: async ({ request, params }) => {
//     const formData = await request.formData();
//     const invoice = get(filteredInvoices).find((inv) => inv.id === params.id);
//     console.log(invoice);
//     console.log(formData);
//   }
// };
