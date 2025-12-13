import { View } from '@/components/base/View';
import { ModalActionsData, ModalActionsSettings } from '@/types/components/view/modal';
import { ButtonData } from '@/types/components/view/button';

/**
 * Универсальный View для футера модалки.
 * Содержит кнопку (инжектится) и вторичный элемент (ошибка, цена и т.д.).
 * Получает готовый element (.modal__actions).
 *
 * @example
 * // Для форм (с ошибкой)
 * const actionsView = new ModalActionsView(actionsEl, {
 *   buttonView,
 *   secondarySelector: '.form__errors',
 * });
 * actionsView.render({ button: { label: 'Далее' }, secondary: 'Заполните адрес' });
 *
 * // Для корзины (с ценой)
 * const actionsView = new ModalActionsView(actionsEl, {
 *   buttonView,
 *   secondarySelector: '.basket__price',
 * });
 * actionsView.render({ button: { label: 'Оформить' }, secondary: '1500 синапсов' });
 */
export class ModalActionsView extends View<ModalActionsData, ModalActionsSettings> {
	/**
	 * Сеттер для кнопки — делегирует в инжектированный buttonView
	 */
	set button(data: ButtonData) {
		this.settings.buttonView.render(data);
	}

	/**
	 * Сеттер для вторичного элемента (ошибка, цена и т.д.)
	 */
	set secondary(value: string | undefined) {
		this.setValue(this.settings.secondarySelector, value ?? '');
	}
}
