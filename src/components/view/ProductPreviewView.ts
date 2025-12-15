import { View } from '@/components/base/View';
import {
	ProductPreviewData,
	ProductPreviewSettings,
} from '@/types/components/view/product';
import { ProductId, ProductCategory } from '@/types/components/model/larekApi';

export class ProductPreviewView extends View<
	ProductPreviewData,
	ProductPreviewSettings,
	HTMLButtonElement
> {
	private currentId!: ProductId;

	protected init(): void {
		this.element.addEventListener('click', () => {
			this.settings.onClick(this.currentId);
		});
	}

	set id(value: ProductId) {
		this.currentId = value;
	}

	set category(value: ProductCategory) {
		this.settings.categoryView.render({ category: value });
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
