import { ModalScreen } from './ModalScreen';
import { ProductModalView } from './ProductModalView';
import { ProductCategory } from '@/types/components/model/larekApi';
import {
	ProductScreenSettings,
	ProductScreenData,
} from '@/types/components/view/product';
import { settings } from '@/utils/constants';
import { cloneTemplate, formatPrice } from '@/utils/utils';

export { ProductScreenSettings, ProductScreenData };

export class ProductScreen extends ModalScreen<
	ProductScreenData,
	ProductScreenSettings
> {
	private productView: ProductModalView;

	protected initContent(): HTMLElement {
		const priceFormatter = (value: number | null) =>
			formatPrice(value ?? 0, settings.text.currency, settings.text.priceless);

		this.productView = new ProductModalView(
			cloneTemplate(settings.templates.productModal),
			{
				onToggleBasket: () => this.settings.onToggleBasket(),
				formatPrice: priceFormatter,
			}
		);

		return this.productView.element;
	}

	set title(value: string) {
		this.productView.title = value;
	}

	set image(value: string) {
		this.productView.image = value;
	}

	set category(value: ProductCategory) {
		this.productView.category = value;
	}

	set description(value: string) {
		this.productView.description = value;
	}

	set price(value: number) {
		this.productView.price = value;
	}

	set isInBasket(value: boolean) {
		const label = value
			? settings.text.removeFromBasket
			: settings.text.addToBasket;
		this.productView.button = { label };
	}
}
