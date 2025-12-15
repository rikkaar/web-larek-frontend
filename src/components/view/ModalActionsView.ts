import { View } from '@/components/base/View';
import {
	ModalActionsData,
	ModalActionsSettings,
} from '@/types/components/view/modal';
import { ButtonData } from '@/types/components/view/button';

export class ModalActionsView extends View<
	ModalActionsData,
	ModalActionsSettings
> {
	set button(data: ButtonData) {
		this.settings.buttonView.render(data);
	}

	set secondary(value: string | undefined) {
		this.setValue(this.settings.secondarySelector, value ?? '');
	}
}
