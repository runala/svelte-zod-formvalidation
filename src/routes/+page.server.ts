import { z } from 'zod';
import type { Actions } from './$types';

const personSchema = z.object({
	firstName: z
		.string({ required_error: 'First name is required' })
		.min(2, { message: 'First name has to be longer then 2 letters.' })
		.max(20, { message: 'First name cant be longer the 20 letters.' }),
	lastName: z
		.string({ required_error: 'Last name is required' })
		.min(2, { message: 'Last name has to be longer then 2 letters' })
		.max(20, { message: 'Last name cant be longer the 20 letters' }),
	email: z.string().email({ message: 'Email is not valid' }),
	age: z.coerce
		.number({ required_error: 'Person need a age' })
		.gte(18, { message: 'Age has to be greater then 18' })
		.lte(100, { message: 'Age has to be less then 100' }),
	height: z.coerce
		.number({ required_error: 'Person need a height' })
		.gte(100, { message: 'Height has to be greater then 100' })
});

export type person = z.infer<typeof personSchema>;

export const actions: Actions = {
	default: async ({ request }) => {
		const formdata = await request.formData();
		const data = Object.fromEntries(formdata);

		const validated = await personSchema.safeParseAsync(data);

		if (!validated.success) {
			return { data: data, errors: validated.error.flatten().fieldErrors };
		}

		return { status: 200, body: 'ok', data: validated.data };
	}
};
