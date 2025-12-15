import { FormView } from './FormView';
import { OptionGroupView } from './OptionGroupView';
import { ButtonView } from './ButtonView';
import {
	OrderFormField,
	OrderFormData,
	OrderFormSettings,
} from '@/types/components/view/form';
import { PaymentMethod } from '@/types/components/model/larekApi';
import { ensureElement } from '@/utils/utils';

export { OrderFormData, OrderFormSettings };

export class OrderFormView extends FormView<
	OrderFormField,
	OrderFormData,
	OrderFormSettings
> {
	private paymentGroup: OptionGroupView<PaymentMethod>;

	protected init(): void {
		super.init();

		this.paymentGroup = new OptionGroupView<PaymentMethod>(this.element, {
			options: [
				{
					value: 'online',
					view: new ButtonView(
						ensureElement<HTMLButtonElement>(
							this.settings.onlineButtonSelector,
							this.element
						),
						{
							onClick: () => this.settings.onPaymentChange('online'),
							activeClass: this.settings.paymentActiveClass,
						}
					),
				},
				{
					value: 'cash',
					view: new ButtonView(
						ensureElement<HTMLButtonElement>(
							this.settings.cashButtonSelector,
							this.element
						),
						{
							onClick: () => this.settings.onPaymentChange('cash'),
							activeClass: this.settings.paymentActiveClass,
						}
					),
				},
			],
			onSelect: (method) => this.settings.onPaymentChange(method),
		});
	}

	set payment(value: PaymentMethod | null) {
		this.paymentGroup.render({ selected: value });
	}
}
