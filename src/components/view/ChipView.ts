import { View } from '@/components/base/View';
import { ChipData, ChipSettings } from '@/types/components/view/chip';
import { ProductCategory } from '@/types/components/model/larekApi';
import { ElementCreator } from '@/types/html';
import { createElement } from '@/utils/utils';

export class ChipView extends View<ChipData, ChipSettings> {
	private currentClass?: string;

	set category(value: ProductCategory) {
		if (this.currentClass) {
			this.toggleClass(this.element, this.currentClass, false);
		}

		this.setValue(this.element, this.settings.labels[value]);
		this.currentClass = this.settings.classes[value];
		this.toggleClass(this.element, this.currentClass, true);
	}

	static create(
		category: ProductCategory,
		creator: ElementCreator,
		settings: ChipSettings
	): HTMLElement {
		const element = createElement(...creator);
		const view = new ChipView(element, settings);
		return view.render({ category });
	}
}
