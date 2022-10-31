/** @type {import('./$types').Actions} */
export const actions = {
  create: async ({ request, params }) => {
    const { id } = params;
    console.log(id);
    console.log('create');
    console.log(request.body);
    const formData = await request.formData();
    console.log(formData);
  },
  update: async ({ request }) => {
    console.log('hello from page.server', request.body);
  }
};
