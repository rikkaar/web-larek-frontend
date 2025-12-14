import { Screen } from '@/components/base/Screen';
import { ModalView } from './ModalView';
import { ModalScreenSettings } from '@/types/components/view/screen';
import { settings } from '@/utils/constants';
import { ensureElement } from '@/utils/utils';

export { ModalScreenSettings };

/**
 * Базовый класс для модальных экранов.
 *
 * - Создаёт ModalView (контейнер)
 * - Дочерние классы реализуют initContent()
 * - isActive управляет открытием/закрытием
 * - Контент устанавливается при открытии, не при инициализации
 */
export abstract class ModalScreen<
	T,
	S extends ModalScreenSettings
> extends Screen<T, S> {
	protected modal: ModalView;
	protected content: HTMLElement;

	/**
	 * Абстрактный метод — дочерние классы создают контент
	 */
	protected abstract initContent(): HTMLElement;

	protected init(): void {
		this.modal = new ModalView(
			ensureElement(settings.modal.container),
			{
				closeSelector: settings.modal.closeButton,
				contentSelector: settings.modal.content,
				activeClass: settings.modal.activeClass,
				onClose: () => this.settings.onClose(),
			}
		);

		// Создаём контент, но НЕ устанавливаем его сразу
		this.content = this.initContent();

		// Screen устанавливает element в init()
		this.element = this.modal.element;
	}

	/**
	 * isActive — устанавливает контент и открывает/закрывает
	 */
	set isActive(value: boolean) {
		if (value) {
			// При открытии устанавливаем свой контент
			this.modal.setContent(this.content);
		}
		this.modal.isActive = value;
	}
}
