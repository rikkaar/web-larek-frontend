import { View } from '@/components/base/View';
import { OrderSuccessData, OrderSuccessSettings } from '@/types/components/view/order';
import { ButtonData } from '@/types/components/view/button';

/**
 * View для экрана успешного заказа.
 * Отображает: сообщение о списании, кнопку.
 *
 * @example
 * const view = new OrderSuccessView(cloneTemplate('#success'), {
 *   descriptionSelector: '.order-success__description',
 *   buttonView: buttonView,  // уже с обработчиком onClick
 *   formatTotal: (v) => `Списано ${formatPrice(v, currency)}`,
 * });
 */
export class OrderSuccessView extends View<OrderSuccessData, OrderSuccessSettings> {
	set total(value: number) {
		this.setValue(this.settings.descriptionSelector, this.settings.formatTotal(value));
	}

	set button(value: ButtonData) {
		this.settings.buttonView.render(value);
	}
}

