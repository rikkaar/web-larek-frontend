import { View } from '@/components/base/View';
import { PageData, PageSettings } from '@/types/components/view/page';
import { HeaderBasketData } from '@/types/components/view/headerBasket';

export class PageView extends View<PageData, PageSettings> {
	set basket(data: HeaderBasketData) {
		this.settings.basketView.render(data);
	}

	set gallery(items: HTMLElement[]) {
		const gallery = this.ensure(this.settings.gallerySelector);
		gallery.replaceChildren(...items);
	}

	set locked(value: boolean) {
		this.toggleClass(
			this.settings.wrapperSelector,
			this.settings.lockedClass,
			value
		);
	}
}
