import { View } from '@/components/base/View';
import { BasketModalData, BasketModalSettings, BasketProductData } from '@/types/components/view/basket';
import { ButtonData } from '@/types/components/view/button';

/**
 * View для модалки корзины.
 * Отображает: список товаров, общую сумму, кнопку оформления.
 *
 * @example
 * const view = new BasketModalView(cloneTemplate('#basket'), {
 *   listSelector: '.basket__list',
 *   priceSelector: '.basket__price',
 *   itemView: basketItemView,  // будет копироваться для каждого товара
 *   buttonView: buttonView,    // уже с обработчиком onClick
 *   formatPrice: (v) => formatPrice(v, currency),
 * });
 */
export class BasketModalView extends View<BasketModalData, BasketModalSettings> {
	set items(value: BasketProductData[]) {
		const list = this.ensure(this.settings.listSelector);
		const elements = value.map((item) => {
			// Копируем itemView для каждого элемента
			const itemView = this.settings.itemView.copy();
			return itemView.render(item);
		});
		list.replaceChildren(...elements);
	}

	set total(value: number) {
		this.setValue(this.settings.priceSelector, this.settings.formatPrice(value));
	}

	set button(value: ButtonData) {
		this.settings.buttonView.render(value);
	}
}

