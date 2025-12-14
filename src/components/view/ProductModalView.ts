import { View } from '@/components/base/View';
import { ProductModalData, ProductModalSettings } from '@/types/components/view/product';
import { ProductCategory } from '@/types/components/model/larekApi';
import { ButtonData } from '@/types/components/view/button';
import { settings } from '@/utils/constants';
import { ensureElement } from '@/utils/utils';

// View создаёт вложенные View сам
import { ButtonView } from './ButtonView';
import { ChipView } from './ChipView';

/**
 * View для карточки продукта в модальном окне.
 *
 * Получает Controller как settings — использует его методы как callbacks.
 * Сам создаёт вложенные View (ButtonView, ChipView) из глобального settings.
 *
 * @example
 * const controller = new ProductController(app.model);
 * const view = new ProductModalView(template, {
 *   onToggleBasket: controller.onToggleBasket,
 *   formatPrice: priceFormatter,
 * });
 */
export class ProductModalView extends View<ProductModalData, ProductModalSettings> {
	private buttonView: ButtonView;
	private chipView: ChipView;

	/**
	 * Инициализация: создаём вложенные View
	 */
	protected init(): void {
		// ChipView для категории
		this.chipView = new ChipView(
			ensureElement(settings.productCard.category, this.element),
			settings.chip
		);

		// ButtonView для кнопки "В корзину"
		this.buttonView = new ButtonView(
			ensureElement<HTMLButtonElement>(settings.productCard.button, this.element),
			{ onClick: () => this.settings.onToggleBasket() }
		);
	}

	set image(value: string) {
		this.setImage(settings.productCard.image, value);
	}

	set title(value: string) {
		this.setValue(settings.productCard.title, value);
	}

	set category(value: ProductCategory) {
		this.chipView.render({ category: value });
	}

	set description(value: string) {
		this.setValue(settings.productCard.description, value);
	}

	set price(value: number | null) {
		this.setValue(settings.productCard.price, this.settings.formatPrice(value));
	}

	set button(value: ButtonData) {
		this.buttonView.render(value);
	}
}
