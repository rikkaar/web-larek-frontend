import { View } from '@/components/base/View';
import { ProductModalData, ProductModalSettings } from '@/types/components/view/product';
import { ProductCategory } from '@/types/components/model/larekApi';
import { ButtonData } from '@/types/components/view/button';

/**
 * View для карточки продукта в модальном окне.
 * Отображает: image, category, title, description, price, кнопку.
 *
 * @example
 * const view = new ProductModalView(cloneTemplate('#card-preview'), {
 *   imageSelector: '.card__image',
 *   titleSelector: '.card__title',
 *   descriptionSelector: '.card__text',
 *   priceSelector: '.card__price',
 *   categoryView: chipView,
 *   buttonView: buttonView,  // уже с обработчиком onClick
 *   formatPrice: (v) => formatPriceOrPriceless(v, currency, priceless),
 * });
 */
export class ProductModalView extends View<ProductModalData, ProductModalSettings> {
	set image(value: string) {
		this.setImage(this.settings.imageSelector, value);
	}

	set title(value: string) {
		this.setValue(this.settings.titleSelector, value);
	}

	set category(value: ProductCategory) {
		this.settings.categoryView.render({ category: value });
	}

	set description(value: string) {
		this.setValue(this.settings.descriptionSelector, value);
	}

	set price(value: number | null) {
		this.setValue(this.settings.priceSelector, this.settings.formatPrice(value));
	}

	set button(value: ButtonData) {
		this.settings.buttonView.render(value);
	}
}
