import { View } from '@/components/base/View';
import {
	BasketProductData,
	BasketProductSettings,
} from '@/types/components/view/basket';
import { ProductId } from '@/types/components/model/larekApi';

export class BasketProductView extends View<
	BasketProductData,
	BasketProductSettings
> {
	private currentId?: ProductId;

	protected init(): void {
		const deleteBtn = this.ensure<HTMLButtonElement>(
			this.settings.deleteSelector
		);
		deleteBtn.addEventListener('click', () => {
			if (this.currentId) {
				this.settings.onDelete(this.currentId);
			}
		});
	}

	set id(value: ProductId) {
		this.currentId = value;
	}

	set index(value: number) {
		this.setValue(this.settings.indexSelector, String(value));
	}

	set title(value: string) {
		this.setValue(this.settings.titleSelector, value);
	}

	set price(value: number) {
		this.setValue(
			this.settings.priceSelector,
			this.settings.formatPrice(value)
		);
	}
}
