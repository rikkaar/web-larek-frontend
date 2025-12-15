import { z } from 'zod';

export const orderFormSchema = z.object({
	payment: z.enum(['online', 'cash'], 'Выберите способ оплаты'),
	address: z
		.string('Укажите адрес доставки')
		.min(1, 'Укажите адрес доставки')
		.min(5, 'Адрес слишком короткий'),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;

export const orderFormInitialValues: Partial<OrderFormValues> = {
	payment: undefined,
	address: '',
};

export const contactsFormSchema = z.object({
	email: z.email('Укажите email'),
	phone: z
		.string('Укажите телефон')
		.min(1, 'Укажите телефон')
		.regex(/^\+?[0-9\s\-()]{10,}$/, 'Некорректный телефон'),
});

export type ContactsFormValues = z.infer<typeof contactsFormSchema>;

export const contactsFormInitialValues: ContactsFormValues = {
	email: '',
	phone: '',
};
