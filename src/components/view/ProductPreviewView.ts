import { View } from '@/components/base/View';
import { ProductPreviewData, ProductPreviewSettings } from '@/types/components/view/product';
import { ProductId, ProductCategory } from '@/types/components/model/larekApi';

/**
 * View для карточки продукта в галерее.
 * Отображает: category (ChipView), title, image, price.
 * Весь элемент кликабельный.
 *
 * @example
 * const cardView = new ProductPreviewView(cloneTemplate('#card-catalog'), {
 *   titleSelector: '.card__title',
 *   imageSelector: '.card__image',
 *   priceSelector: '.card__price',
 *   categoryView: new ChipView(categoryEl, settings.chip),
 *   onClick: (id) => openProduct(id),
 *   formatPrice: (v) => formatPriceOrPriceless(v, currency, priceless),
 * });
 */
export class ProductPreviewView extends View<
	ProductPreviewData,
	ProductPreviewSettings,
	HTMLButtonElement
> {
	/** ID текущего продукта для callback */
	private currentId!: ProductId;

	protected init(): void {
		this.element.addEventListener('click', this.handleClick);
	}

	/**
	 * Обработчик клика по карточке
	 */
	private handleClick = (): void => {
		this.settings.onClick(this.currentId);
	};

	/**
	 * Сеттер для ID (сохраняем для callback)
	 */
	set id(value: ProductId) {
		this.currentId = value;
	}

	/**
	 * Сеттер для категории — делегирует в ChipView
	 */
	set category(value: ProductCategory) {
		this.settings.categoryView.render({ category: value });
	}

	/**
	 * Сеттер для названия
	 */
	set title(value: string) {
		this.setValue(this.settings.titleSelector, value);
	}

	/**
	 * Сеттер для изображения
	 */
	set image(value: string) {
		this.setImage(this.settings.imageSelector, value);
	}

	/**
	 * Сеттер для цены
	 */
	set price(value: number | null) {
		this.setValue(this.settings.priceSelector, this.settings.formatPrice(value));
	}
}
