import { ModalScreen } from './ModalScreen';
import { OrderFormView } from './OrderFormView';
import {
	OrderFormField,
	OrderScreenSettings,
	OrderScreenData,
} from '@/types/components/view/form';
import { PaymentMethod } from '@/types/components/model/larekApi';
import { settings } from '@/utils/constants';
import { cloneTemplate } from '@/utils/utils';

export { OrderScreenSettings, OrderScreenData };

/**
 * Экран формы заказа (шаг 1).
 */
export class OrderScreen extends ModalScreen<
	OrderScreenData,
	OrderScreenSettings
> {
	private orderView: OrderFormView;

	protected initContent(): HTMLElement {
		const formTemplate = cloneTemplate<HTMLFormElement>(settings.templates.orderForm);

		this.orderView = new OrderFormView(formTemplate, {
			fields: [{ name: 'address', selector: settings.orderForm.addressInput }],
			submitButtonSelector: settings.form.submitButton,
			errorSelector: settings.form.errors,
			onlineButtonSelector: settings.orderForm.online,
			cashButtonSelector: settings.orderForm.cash,
			paymentActiveClass: settings.orderForm.paymentActiveClass,
			onPaymentChange: (method) => this.settings.onPaymentChange(method),
			onFieldChange: (field, value) => this.settings.onFieldChange(field, value),
			onSubmit: () => this.settings.onSubmit(),
		});

		return this.orderView.element;
	}

	set payment(value: PaymentMethod | null) {
		this.orderView.payment = value;
	}

	set error(value: string | undefined) {
		this.orderView.error = value;
	}

	set valid(value: boolean) {
		this.orderView.button = {
			label: settings.text.next,
			disabled: !value,
		};
	}

	setFieldValue(field: OrderFormField, value: string | undefined): void {
		this.orderView.setFieldValue(field, value);
	}
}
