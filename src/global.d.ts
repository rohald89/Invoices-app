interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus;
  senderAddress: Address;
  clientAddress: Address;
  items: LineItem[];
  total: number;
}

interface LineItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}
