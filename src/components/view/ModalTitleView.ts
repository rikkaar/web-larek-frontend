import { View } from '@/components/base/View';
import { ModalTitleData } from '@/types/components/view/modal';

/**
 * Простой View для заголовка модалки.
 * Получает готовый element (например, <h2>), устанавливает текст.
 * Не у всех модалок есть title — родитель решает, создавать ли этот View.
 *
 * @example
 * // Родитель проверяет наличие и создаёт:
 * const titleEl = container.querySelector('.modal__title');
 * if (titleEl) {
 *   this.titleView = new ModalTitleView(titleEl, {});
 * }
 */
export class ModalTitleView extends View<ModalTitleData, object> {
	/**
	 * Сеттер для текста заголовка
	 */
	set title(value: string) {
		this.setValue(this.element, value);
	}
}
