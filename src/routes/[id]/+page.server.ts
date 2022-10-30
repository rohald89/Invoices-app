import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { filteredInvoices } from '$lib/stores/InvoiceStore';

// export async function load({ params }) {
//   console.log(params);
//   const invoice = get(filteredInvoices).find((inv) => inv.id === params.id);

//   if (!invoice) {
//     return error(404, 'Invoice not found');
//   }
//   return invoice;
// }

export const actions = {
  create: async ({ request }) => {
    console.log(request.body);
    const formData = await request.formData();
    console.log(formData);
  }
};
