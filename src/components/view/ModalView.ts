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

	private _handleEscape = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			this.handleClose();
		}
	};

	protected init(): void {
		this.ensure(this.settings.closeSelector).addEventListener('click', (e) =>
			this.handleClose(e)
		);
		this.element.addEventListener('click', (e) => this.handleClose(e));
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

		if (ModalView._openedModal !== this) {
			return;
		}

		this.element.classList.remove(this.settings.activeClass);
		ModalView._openedModal = null;

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
		document.addEventListener('keydown', this._handleEscape);
	}

	close(): void {
		document.removeEventListener('keydown', this._handleEscape);
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
