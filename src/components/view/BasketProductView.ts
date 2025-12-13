import { View } from '@/components/base/View';
import { BasketProductData, BasketProductSettings } from '@/types/components/view/basket';
import { ProductId } from '@/types/components/model/larekApi';

/**
 * View для элемента корзины.
 * Отображает: index, title, price, кнопка удаления.
 *
 * @example
 * const itemView = new BasketProductView(element, {
 *   indexSelector: '.basket__item-index',
 *   titleSelector: '.card__title',
 *   priceSelector: '.card__price',
 *   deleteSelector: '.basket__item-delete',
 *   onDelete: (id) => handleDelete(id),
 *   formatPrice: (v) => `${v} синапсов`,
 * });
 * itemView.render({ id: '123', index: 1, title: 'Товар', price: 500 });
 */
export class BasketProductView extends View<BasketProductData, BasketProductSettings> {
	/** ID текущего элемента для callback */
	private currentId?: ProductId;

	protected init(): void {
		const deleteBtn = this.ensure<HTMLButtonElement>(this.settings.deleteSelector);
		deleteBtn.addEventListener('click', this.handleDelete);
	}

	/**
	 * Обработчик удаления
	 */
	private handleDelete = (): void => {
		if (this.currentId) {
			this.settings.onDelete(this.currentId);
		}
	};

	/**
	 * Сеттер для ID (сохраняем для callback)
	 */
	set id(value: ProductId) {
		this.currentId = value;
	}

	/**
	 * Сеттер для индекса
	 */
	set index(value: number) {
		this.setValue(this.settings.indexSelector, String(value));
	}

	/**
	 * Сеттер для названия
	 */
	set title(value: string) {
		this.setValue(this.settings.titleSelector, value);
	}

	/**
	 * Сеттер для цены
	 */
	set price(value: number) {
		this.setValue(this.settings.priceSelector, this.settings.formatPrice(value));
	}
}

