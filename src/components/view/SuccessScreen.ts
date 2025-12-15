import { ModalScreen } from './ModalScreen';
import { OrderSuccessView } from './OrderSuccessView';
import { ButtonView } from './ButtonView';
import {
	SuccessScreenSettings,
	SuccessScreenData,
} from '@/types/components/view/order';
import { settings } from '@/utils/constants';
import { cloneTemplate, ensureElement, formatPrice } from '@/utils/utils';

export { SuccessScreenSettings, SuccessScreenData };

export class SuccessScreen extends ModalScreen<
	SuccessScreenData,
	SuccessScreenSettings
> {
	private successView: OrderSuccessView;

	protected initContent(): HTMLElement {
		const template = cloneTemplate(settings.templates.orderSuccess);

		const buttonView = new ButtonView(
			ensureElement<HTMLButtonElement>(
				settings.orderSuccess.closeButton,
				template
			),
			{ onClick: () => this.settings.onClose() }
		);

		this.successView = new OrderSuccessView(template, {
			descriptionSelector: settings.orderSuccess.description,
			buttonView,
			formatTotal: (value) =>
				`Списано ${formatPrice(
					value,
					settings.text.currency,
					settings.text.priceless
				)}`,
		});

		return this.successView.element;
	}

	set total(value: number) {
		this.successView.total = value;
	}
}
