import { FormFieldConfig } from './formField';
import { ButtonData } from './button';
import { ModalScreenSettings } from './screen';
import { PaymentMethod } from '@/types/components/model/larekApi';

export type OrderFormField = 'address';

export type ContactsFormField = 'email' | 'phone';

export interface FormViewSettings<K extends string> {
	fields: FormFieldConfig<K>[];

	submitButtonSelector: string;

	errorSelector: string;

	onFieldChange: (field: K, value: string) => void;

	onSubmit: () => void;
}

export interface FormViewData {
	error?: string;
	button?: ButtonData;
}

export interface OrderFormData extends FormViewData {
	payment: PaymentMethod | null;
}

export interface OrderFormSettings extends FormViewSettings<OrderFormField> {
	onlineButtonSelector: string;

	cashButtonSelector: string;

	paymentActiveClass: string;

	onPaymentChange: (method: PaymentMethod) => void;
}

export interface OrderScreenSettings extends ModalScreenSettings {
	onPaymentChange: (method: PaymentMethod) => void;
	onFieldChange: (field: OrderFormField, value: string) => void;
	onSubmit: () => void;
}

export interface OrderScreenData {
	payment: PaymentMethod | null;
	error?: string;
	valid: boolean;
	isActive?: boolean;
}

export interface ContactsScreenSettings extends ModalScreenSettings {
	onFieldChange: (field: ContactsFormField, value: string) => void;
	onSubmit: () => void;
}

export interface ContactsScreenData {
	error?: string;
	valid: boolean;
	isActive?: boolean;
}
