import { View } from '@/components/base/View';
import {
	OrderSuccessData,
	OrderSuccessSettings,
} from '@/types/components/view/order';
import { ButtonData } from '@/types/components/view/button';

export class OrderSuccessView extends View<
	OrderSuccessData,
	OrderSuccessSettings
> {
	set total(value: number) {
		this.setValue(
			this.settings.descriptionSelector,
			this.settings.formatTotal(value)
		);
	}

	set button(value: ButtonData) {
		this.settings.buttonView.render(value);
	}
}
