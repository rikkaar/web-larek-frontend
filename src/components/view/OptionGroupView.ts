import { View } from '@/components/base/View';
import {
	OptionGroupData,
	OptionGroupSettings,
} from '@/types/components/view/optionGroup';

export class OptionGroupView<T> extends View<
	OptionGroupData<T>,
	OptionGroupSettings<T>
> {
	set selected(value: T | null) {
		for (const option of this.settings.options) {
			option.view.render({ active: option.value === value });
		}
	}
}
