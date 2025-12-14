import { View } from '@/components/base/View';
import { ModalData, ModalViewSettings, IModal } from '@/types/components/view/modal';

export { ModalViewSettings };

/**
 * View для модального окна.
 * Контейнер — один на всё приложение.
 * Контент вставляется динамически.
 */
export class ModalView
	extends View<ModalData, ModalViewSettings>
	implements IModal
{
	/** Текущая открытая модалка (всегда одна) */
	protected static _openedModal: ModalView | null = null;

	/** Флаг: слушатели уже навешены на элемент */
	private static _listenersAttached = false;

	protected init(): void {
		// Навешиваем слушатели только один раз
		if (ModalView._listenersAttached) return;
		ModalView._listenersAttached = true;

		// Клик по кнопке закрытия или overlay
		this.ensure(this.settings.closeSelector).addEventListener(
			'click',
			(e) => this.handleClose(e)
		);
		this.element.addEventListener('click', (e) => this.handleClose(e));

		// ESC закрывает модалку
		document.addEventListener('keydown', (event: KeyboardEvent) => {
			if (event.key === 'Escape' && ModalView._openedModal) {
				ModalView._openedModal.handleClose();
			}
		});
	}

	/**
	 * Обработчик закрытия.
	 * @param event — если есть, значит закрытие пользователем (вызовет onClose)
	 */
	protected handleClose(event?: MouseEvent): void {
		// Проверяем, что кликнули именно на overlay или кнопку закрытия
		if (
			event &&
			![this.ensure(this.settings.closeSelector), this.element].includes(
				event.target as HTMLElement
			)
		) {
			return;
		}

		this.element.classList.remove(this.settings.activeClass);

		if (ModalView._openedModal === this) {
			ModalView._openedModal = null;
		}

		// Вызываем onClose только при user-initiated закрытии
		if (event) {
			this.settings.onClose();
		}
	}

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
		// Закрыть предыдущую без вызова onClose
		if (ModalView._openedModal && ModalView._openedModal !== this) {
			ModalView._openedModal.close();
		}
		ModalView._openedModal = this;
		this.element.classList.add(this.settings.activeClass);
	}

	/**
	 * Закрыть модалку программно (без вызова onClose)
	 */
	close(): void {
		this.handleClose(); // без event — onClose не вызовется
	}

	/**
	 * Установить контент
	 */
	setContent(content: HTMLElement): void {
		this.content = content;
	}

	/**
	 * isActive — открытие/закрытие через сеттер
	 */
	set isActive(value: boolean) {
		if (value) {
			this.open();
		} else {
			this.close();
		}
	}
}
