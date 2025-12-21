import { View } from '@/components/base/View';
import {
	ProductPreviewData,
	ProductPreviewSettings,
} from '@/types/components/view/product';
import { ProductId, ProductCategory } from '@/types/components/model/larekApi';
import { ChipView } from './ChipView';
import { ensureElement } from '@/utils/utils';
import { settings } from '@/utils/constants';


export class ProductPreviewView extends View<
	ProductPreviewData,
	ProductPreviewSettings,
	HTMLButtonElement
> {
	private currentId!: ProductId;
	private chipView: ChipView;


	protected init(): void {
		this.chipView = new ChipView(
			ensureElement(settings.productCard.category, this.element),
			settings.chip
		);

		this.element.addEventListener('click', () => {
			this.settings.onClick(this.currentId);
		});
	}

	set id(value: ProductId) {
		this.currentId = value;
	}

	set category(value: ProductCategory) {
		this.chipView.render({ category: value });
	}

	set title(value: string) {
		this.setValue(this.settings.titleSelector, value);
	}

	set image(value: string) {
		this.setImage(this.settings.imageSelector, value);
	}

	set price(value: number | null) {
		this.setValue(
			this.settings.priceSelector,
			this.settings.formatPrice(value)
		);
	}
}
