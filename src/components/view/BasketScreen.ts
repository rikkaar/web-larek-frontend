import { ModalScreen } from './ModalScreen';
import { BasketModalView } from './BasketModalView';
import { BasketProductView } from './BasketProductView';
import { ButtonView } from './ButtonView';
import {
	BasketProductData,
	BasketScreenSettings,
	BasketScreenData,
} from '@/types/components/view/basket';
import { ButtonData } from '@/types/components/view/button';
import { settings } from '@/utils/constants';
import { cloneTemplate, formatPrice } from '@/utils/utils';

export { BasketScreenSettings, BasketScreenData };

/**
 * Экран корзины в модалке.
 *
 * @example
 * const basketScreen = new BasketScreen(new BasketController(app.model));
 *
 * basketScreen.render({
 *   items: [...],
 *   total: 1000,
 *   isActive: true,
 * });
 */
export class BasketScreen extends ModalScreen<
	BasketScreenData,
	BasketScreenSettings
> {
	private basketView: BasketModalView;

	/**
	 * Создаёт контент модалки
	 */
	protected initContent(): HTMLElement {
		const priceFormatter = (value: number) =>
			formatPrice(value, settings.text.currency, settings.text.priceless);

		// Шаблон для элемента корзины
		const itemView = new BasketProductView(
			cloneTemplate(settings.templates.basketProduct),
			{
				indexSelector: settings.basket.item.index,
				titleSelector: settings.basket.item.title,
				priceSelector: settings.basket.item.price,
				deleteSelector: settings.basket.item.deleteButton,
				onDelete: (id) => this.settings.onRemove(id),
				formatPrice: priceFormatter,
			}
		);

		// Кнопка "Оформить"
		const basketTemplate = cloneTemplate(settings.templates.basketModal);
		const buttonView = new ButtonView(
			this.ensure<HTMLButtonElement>(settings.basket.submitButton, basketTemplate),
			{ onClick: () => this.settings.onCheckout() }
		);

		this.basketView = new BasketModalView(basketTemplate, {
			listSelector: settings.basket.list,
			priceSelector: settings.basket.totalPrice,
			itemView,
			buttonView,
			formatPrice: priceFormatter,
		});

		return this.basketView.element;
	}

	/**
	 * Сеттеры
	 */
	set items(value: BasketProductData[]) {
		this.basketView.items = value;
	}

	set total(value: number) {
		this.basketView.total = value;
	}

	/**
	 * Screen определяет состояние кнопки
	 */
	set isDisabled(value: boolean) {
		this.basketView.button = {
			label: 'Оформить',
			disabled: value,
		} as ButtonData;
	}

	// isActive наследуется от ModalScreen
}
