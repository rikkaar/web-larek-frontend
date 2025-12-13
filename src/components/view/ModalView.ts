import { View } from '@/components/base/View';
import { ModalData, ModalSettings, IModal } from '@/types/components/view/modal';

/**
 * Настройки для ModalView (расширяем базовые)
 */
export interface ModalViewSettings extends ModalSettings {
	/** Селектор кнопки закрытия */
	closeSelector: string;
	/** Селектор контента */
	contentSelector: string;
	/** CSS-класс активного состояния */
	activeClass: string;
}

/**
 * View для модального окна.
 * Контейнер — один на всё приложение.
 * Контент вставляется динамически.
 *
 * @example
 * const modal = new ModalView(ensureElement('#modal-container'), {
 *   closeSelector: '.modal__close',
 *   contentSelector: '.modal__content',
 *   activeClass: 'modal_active',
 *   onClose: () => events.emit('modal:close'),
 * });
 *
 * modal.render({ content: someView.element });
 * modal.open();
 */
export class ModalView
	extends View<ModalData, ModalViewSettings>
	implements IModal
{
	/** Текущая открытая модалка (всегда одна) */
	protected static _openedModal: ModalView | null = null;

	protected init(): void {
		// Клик по кнопке закрытия
		this.ensure(this.settings.closeSelector).addEventListener(
			'click',
			this.handleClose
		);
		// Клик по overlay (сам элемент .modal)
		this.element.addEventListener('click', this.handleOverlayClick);
		// ESC закрывает модалку
		document.addEventListener('keydown', this.handleKeyDown);
	}

	/**
	 * Обработчик клика по overlay
	 * Закрывает только если кликнули именно на overlay, а не на контейнер
	 */
	private handleOverlayClick = (event: MouseEvent): void => {
		if (event.target === this.element) {
			this.close();
		}
	};

	/**
	 * Обработчик кнопки закрытия
	 */
	private handleClose = (): void => {
		this.close();
	};

	/**
	 * Обработчик ESC
	 */
	private handleKeyDown = (event: KeyboardEvent): void => {
		if (event.key === 'Escape' && ModalView._openedModal === this) {
			this.close();
		}
	};

	/**
	 * Сеттер для контента
	 */
	set content(value: HTMLElement | null) {
		const container = this.ensure(this.settings.contentSelector);
		if (value) {
			container.replaceChildren(value);
		} else {
			container.replaceChildren();
		}
	}

	/**
	 * Открыть модалку
	 */
	open(): void {
		// Закрыть предыдущую, если есть
		if (ModalView._openedModal && ModalView._openedModal !== this) {
			ModalView._openedModal.close();
		}
		ModalView._openedModal = this;
		this.element.classList.add(this.settings.activeClass);
	}

	/**
	 * Закрыть модалку
	 */
	close(): void {
		this.element.classList.remove(this.settings.activeClass);
		if (ModalView._openedModal === this) {
			ModalView._openedModal = null;
		}
		this.settings.onClose();
	}

	/**
	 * Установить контент (альтернатива сеттеру)
	 */
	setContent(content: HTMLElement): void {
		this.content = content;
	}
}

