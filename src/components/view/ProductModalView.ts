import { View } from '@/components/base/View';
import {
	ProductModalData,
	ProductModalSettings,
} from '@/types/components/view/product';
import { ProductCategory } from '@/types/components/model/larekApi';
import { ButtonData } from '@/types/components/view/button';
import { settings } from '@/utils/constants';
import { ensureElement } from '@/utils/utils';

import { ButtonView } from './ButtonView';
import { ChipView } from './ChipView';

export class ProductModalView extends View<
	ProductModalData,
	ProductModalSettings
> {
	private buttonView: ButtonView;
	private chipView: ChipView;

	protected init(): void {
		this.chipView = new ChipView(
			ensureElement(settings.productCard.category, this.element),
			settings.chip
		);

		this.buttonView = new ButtonView(
			ensureElement<HTMLButtonElement>(
				settings.productCard.button,
				this.element
			),
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
