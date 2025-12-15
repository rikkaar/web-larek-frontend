import { View } from '@/components/base/View';
import { ButtonData, ButtonSettings } from '@/types/components/view/button';
import { ElementCreator } from '@/types/html';
import { createElement } from '@/utils/utils';

export class ButtonView<T = void> extends View<
	ButtonData,
	ButtonSettings<T>,
	HTMLButtonElement
> {
	protected init(): void {
		this.element.addEventListener('click', (event: MouseEvent) => {
			this.settings.onClick({ event });
		});
	}

	set label(value: string) {
		this.setValue(this.element, value);
	}

	set disabled(value: boolean) {
		this.setDisabled(this.element, value);
	}

	set active(value: boolean) {
		if (this.settings.activeClass) {
			this.toggleClass(this.element, this.settings.activeClass, value);
		}
	}

	static create(
		label: string,
		creator: ElementCreator<HTMLButtonElement>,
		onClick: (event: MouseEvent) => void
	): HTMLButtonElement {
		const element = createElement<HTMLButtonElement>(...creator);
		const view = new ButtonView(element, {
			onClick: ({ event }) => onClick(event),
		});
		return view.render({ label });
	}
}
