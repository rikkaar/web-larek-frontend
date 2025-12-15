import { View } from '@/components/base/View';
import {
	BasketModalData,
	BasketModalSettings,
	BasketProductData,
} from '@/types/components/view/basket';
import { ButtonData } from '@/types/components/view/button';

export class BasketModalView extends View<
	BasketModalData,
	BasketModalSettings
> {
	set items(value: BasketProductData[]) {
		const list = this.ensure(this.settings.listSelector);
		const elements = value.map((item) => {
			const itemView = this.settings.itemView.copy();
			return itemView.render(item);
		});
		list.replaceChildren(...elements);
	}

	set total(value: number) {
		this.setValue(
			this.settings.priceSelector,
			this.settings.formatPrice(value)
		);
	}

	set button(value: ButtonData) {
		this.settings.buttonView.render(value);
	}
}
