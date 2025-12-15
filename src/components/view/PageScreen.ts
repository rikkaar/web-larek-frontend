import { Screen } from '@/components/base/Screen';
import { PageView } from './PageView';
import { HeaderBasketView } from './HeaderBasketView';
import { ProductPreviewView } from './ProductPreviewView';
import { ChipView } from './ChipView';
import { Product } from '@/types/components/model/larekApi';
import {
	PageScreenSettings,
	PageScreenData,
} from '@/types/components/view/page';
import { settings } from '@/utils/constants';
import { cloneTemplate, ensureElement, formatPrice } from '@/utils/utils';

export { PageScreenSettings, PageScreenData };

export class PageScreen extends Screen<PageScreenData, PageScreenSettings> {
	private pageView: PageView;
	private productTemplate: ProductPreviewView;

	protected init(): void {
		const basketView = new HeaderBasketView(
			ensureElement<HTMLButtonElement>(settings.page.basketButton),
			{
				counterSelector: settings.page.basketCounter,
				onClick: () => this.settings.onBasketClick(),
			}
		);

		this.pageView = new PageView(document.body, {
			wrapperSelector: settings.page.wrapper,
			gallerySelector: settings.page.gallery,
			lockedClass: settings.page.lockedClass,
			basketView,
		});

		const cardTemplate = cloneTemplate<HTMLButtonElement>(
			settings.templates.productPreview
		);

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
			formatPrice: (v) =>
				formatPrice(v, settings.text.currency, settings.text.priceless),
		});

		this.element = this.pageView.element;
	}

	set products(items: Product[]) {
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

	set basketCount(value: number) {
		this.pageView.render({ basket: { counter: value } });
	}

	set locked(value: boolean) {
		this.pageView.render({ locked: value });
	}
}
