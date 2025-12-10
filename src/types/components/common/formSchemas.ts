/**
 * Zod-схемы для форм
 * Описывают структуру и правила валидации
 */

import { z } from 'zod';

/**
 * Схема формы заказа (шаг 1)
 */
export const orderFormSchema = z.object({
	payment: z
		.enum(['online', 'cash'], 'Выберите способ оплаты'),
	address: z
		.string('Укажите адрес доставки')
		.min(1, 'Укажите адрес доставки')
		.min(5, 'Адрес слишком короткий'),
});

/**
 * Тип данных формы заказа (выводится из схемы)
 */
export type OrderFormValues = z.infer<typeof orderFormSchema>;

/**
 * Начальные значения формы заказа
 */
export const orderFormInitialValues: Partial<OrderFormValues> = {
	payment: undefined,
	address: '',
};

/**
 * Схема формы контактов (шаг 2)
 */
export const contactsFormSchema = z.object({
	email: z
		.email('Укажите email'),
	phone: z
		.string('Укажите телефон')
		.min(1, 'Укажите телефон')
		.regex(/^\+?[0-9\s\-()]{10,}$/, 'Некорректный телефон'),
});

/**
 * Тип данных формы контактов (выводится из схемы)
 */
export type ContactsFormValues = z.infer<typeof contactsFormSchema>;

/**
 * Начальные значения формы контактов
 */
export const contactsFormInitialValues: ContactsFormValues = {
	email: '',
	phone: '',
};

