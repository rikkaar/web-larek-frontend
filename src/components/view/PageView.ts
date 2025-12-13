import { View } from '@/components/base/View';
import { PageData, PageSettings } from '@/types/components/view/page';
import { HeaderBasketData } from '@/types/components/view/headerBasket';

/**
 * View для главной страницы.
 * Отображает: хедер с корзиной (через basketView), галерею продуктов.
 * Управляет блокировкой скролла при открытой модалке.
 *
 * @example
 * const page = new PageView(document.body, {
 *   wrapperSelector: '.page__wrapper',
 *   gallerySelector: '.gallery',
 *   lockedClass: 'page__wrapper_locked',
 *   basketView: headerBasketView,
 * });
 */
export class PageView extends View<PageData, PageSettings> {
	set basket(data: HeaderBasketData) {
		this.settings.basketView.render(data);
	}

	set gallery(items: HTMLElement[]) {
		const gallery = this.ensure(this.settings.gallerySelector);
		gallery.replaceChildren(...items);
	}

	set locked(value: boolean) {
		this.toggleClass(this.settings.wrapperSelector, this.settings.lockedClass, value);
	}
}
