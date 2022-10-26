import { writable } from 'svelte/store';
import data from '../../data.json';

export const invoices = writable<Invoice[]>([]);

export const loadInvoices = () => {
  invoices.set(data);
};
