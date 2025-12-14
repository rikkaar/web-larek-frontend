import { Screen } from '@/components/base/Screen';
import { PageView } from './PageView';
import { HeaderBasketView } from './HeaderBasketView';
import { ProductPreviewView } from './ProductPreviewView';
import { ChipView } from './ChipView';
import { NormalizedProduct } from '@/types/components/model/larekApi';
import {
	PageScreenSettings,
	PageScreenData,
} from '@/types/components/view/page';
import { settings } from '@/utils/constants';
import { cloneTemplate, ensureElement, formatPrice } from '@/utils/utils';

export { PageScreenSettings, PageScreenData };

/**
 * Экран главной страницы.
 * Управляет галереей, хедером с корзиной, блокировкой при модалке.
 */
export class PageScreen extends Screen<PageScreenData, PageScreenSettings> {
	private pageView: PageView;
	private productTemplate: ProductPreviewView;

	protected init(): void {
		// Кнопка корзины в хедере
		const basketView = new HeaderBasketView(
			ensureElement<HTMLButtonElement>(settings.page.basketButton),
			{
				counterSelector: settings.page.basketCounter,
				onClick: () => this.settings.onBasketClick(),
			}
		);

		// PageView
		this.pageView = new PageView(document.body, {
			wrapperSelector: settings.page.wrapper,
			gallerySelector: settings.page.gallery,
			lockedClass: settings.page.lockedClass,
			basketView,
		});

		// Шаблон карточки продукта
		const cardTemplate = cloneTemplate<HTMLButtonElement>(settings.templates.productPreview);

		// ChipView внутри шаблона
		const chipView = new ChipView(
			ensureElement(settings.productCard.category, cardTemplate),
			settings.chip
		);

		this.productTemplate = new ProductPreviewView(cardTemplate, {
			titleSelector: settings.productCard.title,
			imageSelector: settings.productCard.image,
			priceSelector: settings.productCard.price,
			categoryView: chipView,
			onClick: (id) => this.settings.onProductClick(id),
			formatPrice: (v) => formatPrice(v ?? 0, settings.text.currency, settings.text.priceless),
		});

		// Screen устанавливает element в init()
		this.element = this.pageView.element;
	}

	/**
	 * Рендер галереи продуктов
	 */
	set products(items: NormalizedProduct[]) {
		const gallery = items.map((product) => {
			const view = this.productTemplate.copy({
				onClick: (id) => this.settings.onProductClick(id),
			});

			return view.render({
				id: product.id,
				title: product.title,
				image: product.image,
				price: product.price,
				category: product.category,
			});
		});

		this.pageView.render({ gallery });
	}

	/**
	 * Обновить счётчик корзины
	 */
	set basketCount(value: number) {
		this.pageView.render({ basket: { counter: value } });
	}

	/**
	 * Блокировка страницы при открытой модалке
	 */
	set locked(value: boolean) {
		this.pageView.render({ locked: value });
	}
}
