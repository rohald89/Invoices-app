<script lang="ts">
  import { calculateDueDate, formatDateForInput } from '$lib/utils/dateHelpers';
  import { generateId } from '$lib/utils/invoiceHelpers';

  const handleSubmit = (event: Event) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    console.log(data);
    const invoice = {
      id: generateId(),
      createdAt: formatDateForInput(new Date()),
      paymentDue: calculateDueDate(new Date(), +data.terms),
      description: data.desc,
      paymentTerms: +data.terms,
      clientName: data.name,
      clientEmail: data.email,
      status: 'draft',
      senderAddress: {
        street: data['sender-street'],
        city: data['sender-city'],
        postCode: data['sender-postcode'],
        country: data['sender-country']
      },
      clientAddress: {
        street: data.street,
        city: data.city,
        postCode: data.postCode,
        country: data.country
      },
      items: [
        {
          name: data.itemName,
          quantity: data.quantity,
          price: data.price,
          total: data.total
        }
      ],
      total: data.total
      //   total: this.items.reduce((acc, item) => acc + item.total, 0)
    };
    console.log(invoice);
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <fieldset class="sender grid gap-6">
    <legend class="col-span-2 mb-6 text-body-1 font-bold tracking-normal text-violet"
      >Bill From</legend
    >
    <div class="inputField inputField__sender-street">
      <label for="sender-street">Street Address</label>
      <input type="text" name="sender-street" id="sender-street" />
    </div>
    <div class="inputField inputField__sender-city">
      <label for="sender-city">City</label>
      <input type="text" name="sender-city" id="sender-city" />
    </div>
    <div class="inputField inputField__sender-postcode">
      <label for="sender-postcode">Post Code</label>
      <input type="text" name="sender-postcode" id="sender-postcode" />
    </div>
    <div class="inputField inputField__sender-country">
      <label for="sender-country">Country</label>
      <input type="text" name="sender-country" id="sender-country" />
    </div>
  </fieldset>
  <fieldset class="receiver mt-12 grid gap-6">
    <legend class="col-span-2 mb-6 text-body-1 font-bold tracking-normal text-violet"
      >Bill From</legend
    >
    <div class="inputField inputField__name">
      <label for="name">Client's Name</label>
      <input type="text" name="name" id="name" />
    </div>
    <div class="inputField inputField__email">
      <label for="email">Client's Email</label>
      <input type="text" name="email" id="email" />
    </div>
    <div class="inputField inputField__street">
      <label for="street">Street Address</label>
      <input type="text" name="street" id="street" />
    </div>
    <div class="inputField inputField__city">
      <label for="city">City</label>
      <input type="text" name="city" id="city" />
    </div>
    <div class="inputField inputField__postcode">
      <label for="postcode">Post Code</label>
      <input type="text" name="postcode" id="postcode" />
    </div>
    <div class="inputField inputField__country">
      <label for="country">Country</label>
      <input type="text" name="country" id="country" />
    </div>
  </fieldset>
  <fieldset class="payment mt-12 grid gap-6">
    <div class="inputField inputField__date">
      <label for="date">Invoice Date</label>
      <input type="date" name="date" id="date" />
    </div>
    <div class="inputField inputField__terms">
      <label for="terms">Payment Terms</label>
      <!-- <input type="text" name="terms" id="terms" /> -->
      <select name="terms" id="terms">
        <option value="1">Net 1 Day</option>
        <option value="7">Net 7 Days</option>
        <option value="14">Net 14 Days</option>
        <option value="30">Net 30 Days</option>
      </select>
    </div>
    <div class="inputField inputField__description">
      <label for="desc">Project Description</label>
      <input type="text" name="desc" id="desc" />
    </div>
  </fieldset>
  <button
    type="submit"
    class="mt-12 rounded-lg bg-violet py-4 px-8 text-body-1 font-bold tracking-normal text-offWhite"
    >Save</button
  >
</form>

<style lang="postcss">
  .sender {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'sender-street sender-street'
      'sender-city sender-postcode'
      'sender-country sender-country';
  }
  .inputField {
    @apply flex flex-col gap-[10px];
  }
  .inputField label {
    @apply block text-body-1 font-medium tracking-normal text-grayishBlue dark:text-coolGrey;
  }

  .inputField input {
    @apply box-border block w-full cursor-pointer rounded-[4px] border-1 border-lavender py-4 px-5 text-body-1 font-bold tracking-normal text-black caret-violet focus:outline-none focus:ring-1 focus:ring-violet dark:border-darkBlue dark:bg-veryDarkBlue dark:text-white;
  }

  .inputField__sender-street {
    grid-area: sender-street;
  }
  .inputField__sender-city {
    grid-area: sender-city;
  }
  .inputField__sender-postcode {
    grid-area: sender-postcode;
  }
  .inputField__sender-country {
    grid-area: sender-country;
  }

  @media (min-width: 768px) {
    .sender {
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas:
        'sender-street sender-street sender-street'
        'sender-city sender-postcode sender-country';
    }
  }

  .receiver {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'name name'
      'email email'
      'street street'
      'city postcode'
      'country country';
  }
  .receiver .inputField__name {
    grid-area: name;
  }
  .receiver .inputField__email {
    grid-area: email;
  }
  .receiver .inputField__street {
    grid-area: street;
  }
  .receiver .inputField__city {
    grid-area: city;
  }
  .receiver .inputField__postcode {
    grid-area: postcode;
  }
  .receiver .inputField__country {
    grid-area: country;
  }

  @media (min-width: 768px) {
    .receiver {
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas:
        'name name name'
        'email email email'
        'street street street'
        'city postcode country';
    }
  }

  .payment {
    grid-template-columns: 1fr;
    grid-template-areas:
      'date'
      'terms'
      'desc';
  }
  .payment .inputField__date {
    grid-area: date;
  }
  .payment .inputField__terms {
    grid-area: terms;
  }
  .payment .inputField__description {
    grid-area: desc;
  }

  @media (min-width: 768px) {
    .payment {
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas:
        'date terms'
        'desc desc';
    }
  }
</style>
