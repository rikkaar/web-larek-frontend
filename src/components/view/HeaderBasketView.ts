import { View } from '@/components/base/View';
import { HeaderBasketData, HeaderBasketSettings } from '@/types/components/view/headerBasket';

/**
 * View для кнопки корзины в хедере.
 * Отображает счётчик товаров, обрабатывает клик.
 *
 * @example
 * const basket = new HeaderBasketView(ensureElement('.header__basket'), {
 *   counterSelector: '.header__basket-counter',
 *   onClick: () => events.emit('basket:open'),
 * });
 *
 * basket.render({ counter: 3 });
 */
export class HeaderBasketView extends View<
	HeaderBasketData,
	HeaderBasketSettings,
	HTMLButtonElement
> {
	protected init(): void {
		this.element.addEventListener('click', this.handleClick);
	}

	private handleClick = (event: MouseEvent): void => {
		this.settings.onClick({ event });
	};

	set counter(value: number) {
		this.setValue(this.settings.counterSelector, String(value));
	}
}

