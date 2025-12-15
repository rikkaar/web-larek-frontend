import { Screen } from '@/components/base/Screen';
import { ModalView } from './ModalView';
import { ModalScreenSettings } from '@/types/components/view/screen';
import { settings } from '@/utils/constants';
import { ensureElement } from '@/utils/utils';

export { ModalScreenSettings };

export abstract class ModalScreen<
	T,
	S extends ModalScreenSettings
> extends Screen<T, S> {
	protected modal: ModalView;
	protected content: HTMLElement;

	protected abstract initContent(): HTMLElement;

	protected init(): void {
		this.modal = new ModalView(ensureElement(settings.modal.container), {
			closeSelector: settings.modal.closeButton,
			contentSelector: settings.modal.content,
			activeClass: settings.modal.activeClass,
			onClose: () => this.settings.onClose(),
		});

		this.content = this.initContent();

		this.element = this.modal.element;
	}

	set isActive(value: boolean) {
		if (value) {
			this.modal.setContent(this.content);
		}
		this.modal.isActive = value;
	}
}
