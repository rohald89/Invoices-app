// import type { InvoiceStatus } from 'src/enums';
import { goto } from '$app/navigation';
import { get, writable } from 'svelte/store';
import data from '../../data.json';

export const invoices = writable<Invoice[]>([]);

export const loadInvoices = () => {
  invoices.set(data);
};
loadInvoices();

export const addInvoice = (invoice: Invoice) => {
  console.log(invoice);
  invoices.update((invoices) => {
    return [invoice, ...invoices];
  });
};

export const deleteInvoice = (id: string) => {
  console.log(id);
  const currentInvoices = get(invoices);
  const updatedInvoices = currentInvoices.filter((inv) => inv.id !== id);
  invoices.set(updatedInvoices);
  goto('/');
};

export const changeStatus = (id: string, status: InvoiceStatus) => {
  console.log(id, status);
  const currentInvoices = get(invoices);
  const updatedInvoices = currentInvoices.map((inv) => {
    if (inv.id === id) {
      return {
        ...inv,
        status
      };
    }
    return inv;
  });
  console.log(updatedInvoices);
  invoices.set(updatedInvoices);
};
