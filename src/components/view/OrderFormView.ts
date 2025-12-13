import { FormView, FormViewSettings, FormViewData } from './FormView';
import { OrderFormField } from '@/types/components/view/form';
import { PaymentMethod } from '@/types/components/model/larekApi';
import { ButtonData } from '@/types/components/view/button';
import { IView } from '@/types/components/base/view';
import { OptionGroupData } from '@/types/components/view/optionGroup';

/**
 * Данные для формы заказа
 */
export interface OrderFormData extends FormViewData {
	payment: PaymentMethod | null;
	button: ButtonData;
}

/**
 * Настройки для формы заказа
 */
export interface OrderFormSettings extends FormViewSettings<OrderFormField> {
	paymentGroupView: IView<OptionGroupData<PaymentMethod>>;
	buttonView: IView<ButtonData>;
}

/**
 * View для формы заказа (шаг 1).
 * Отображает: выбор способа оплаты, поле адреса, кнопку, ошибку.
 *
 * @example
 * const view = new OrderFormView(cloneTemplate('#order'), {
 *   fields: [{ name: 'address', selector: 'input[name="address"]' }],
 *   errorSelector: '.form__errors',
 *   paymentGroupView: paymentOptionGroup,
 *   buttonView: submitButtonView,
 *   onFieldChange: (field, value) => controller.setField(field, value),
 *   onSubmit: (event) => { event.preventDefault(); controller.submit(); },
 * });
 */
export class OrderFormView extends FormView<
	OrderFormField,
	OrderFormData,
	OrderFormSettings
> {
	set payment(value: PaymentMethod | null) {
		this.settings.paymentGroupView.render({ selected: value });
	}

	set button(value: ButtonData) {
		this.settings.buttonView.render(value);
	}
}
