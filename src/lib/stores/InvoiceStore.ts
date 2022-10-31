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
  filteredInvoices.update((invoices) => [invoice, ...invoices]);
};

export const updateInvoice = (invoice: Invoice) => {
  invoices.update((invoices) => {
    const index = invoices.findIndex((inv) => inv.id === invoice.id);
    invoices[index] = invoice;
    filterInvoices();
    return invoices;
  });
};

export const deleteInvoice = (id: string) => {
  invoices.update((invoices) => invoices.filter((inv) => inv.id !== id));
  filteredInvoices.update((invoices) => invoices.filter((inv) => inv.id !== id));
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
  filterInvoices();
};
