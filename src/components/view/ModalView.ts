import { View } from '@/components/base/View';
import {
	ModalData,
	ModalViewSettings,
	IModal,
} from '@/types/components/view/modal';

export { ModalViewSettings };

export class ModalView
	extends View<ModalData, ModalViewSettings>
	implements IModal
{
	protected static _openedModal: ModalView | null = null;

	private static _listenersAttached = false;

	protected init(): void {
		if (ModalView._listenersAttached) return;
		ModalView._listenersAttached = true;

		this.ensure(this.settings.closeSelector).addEventListener('click', (e) =>
			this.handleClose(e)
		);
		this.element.addEventListener('click', (e) => this.handleClose(e));

		document.addEventListener('keydown', (event: KeyboardEvent) => {
			if (event.key === 'Escape' && ModalView._openedModal) {
				ModalView._openedModal.handleClose();
			}
		});
	}

	protected handleClose(event?: MouseEvent): void {
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

		if (event) {
			this.settings.onClose();
		}
	}

	set content(value: HTMLElement | null) {
		const container = this.ensure(this.settings.contentSelector);
		if (value) {
			container.replaceChildren(value);
		} else {
			container.replaceChildren();
		}
	}

	open(): void {
		if (ModalView._openedModal && ModalView._openedModal !== this) {
			ModalView._openedModal.close();
		}
		ModalView._openedModal = this;
		this.element.classList.add(this.settings.activeClass);
	}

	close(): void {
		this.handleClose();
	}

	setContent(content: HTMLElement): void {
		this.content = content;
	}

	set isActive(value: boolean) {
		if (value) {
			this.open();
		} else {
			this.close();
		}
	}
}
