import { goto } from '$app/navigation';
import { get, writable } from 'svelte/store';
import data from '../../data.json';

export const invoices = writable<Invoice[]>([]);
export const filteredInvoices = writable<Invoice[]>([]);
export const activeStatuses = writable<InvoiceStatus[]>([]);

export const loadData = () => {
  console.log('data being loaded');
  invoices.set(data);
  filteredInvoices.set(data);
};
loadData();

export const toggleStatus = (status: InvoiceStatus) => {
  const statuses = get(activeStatuses);
  if (statuses.includes(status)) {
    activeStatuses.update((statuses) => statuses.filter((s) => s !== status));
  } else {
    activeStatuses.update((statuses) => [...statuses, status]);
  }
};

export const filterInvoices = () => {
  const statuses = get(activeStatuses);
  if (statuses.length === 0) {
    filteredInvoices.set(get(invoices));
  } else {
    filteredInvoices.set(get(invoices).filter((inv) => statuses.includes(inv.status)));
  }
};

export const getInvoice = (id: string) => {
  return get(filteredInvoices).find((inv) => inv.id === id);
};

export const addInvoice = (invoice: Invoice) => {
  invoices.update((invoices) => [invoice, ...invoices]);
  filterInvoices();
};

export const updateInvoice = (invoice: Invoice) => {
  invoices.update((invoices) => {
    console.log('updating invoice', invoice);
    const index = invoices.findIndex((inv) => inv.id === invoice.id);
    console.log(index);
    invoices[index] = invoice;
    console.log(invoices);
    return invoices;
  });
};

export const deleteInvoice = (id: string) => {
  console.log(id);
  const currentInvoices = get(invoices);
  const updatedInvoices = currentInvoices.filter((inv) => inv.id !== id);
  invoices.set(updatedInvoices);
  filterInvoices();
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
