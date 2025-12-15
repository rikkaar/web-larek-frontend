import { View } from '@/components/base/View';
import {
	HeaderBasketData,
	HeaderBasketSettings,
} from '@/types/components/view/headerBasket';

export class HeaderBasketView extends View<
	HeaderBasketData,
	HeaderBasketSettings,
	HTMLButtonElement
> {
	protected init(): void {
		this.element.addEventListener('click', (event: MouseEvent) => {
			this.settings.onClick({ event });
		});
	}

	set counter(value: number) {
		this.setValue(this.settings.counterSelector, String(value));
	}
}
