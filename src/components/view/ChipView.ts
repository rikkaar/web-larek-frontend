import { View } from '@/components/base/View';
import { ChipData, ChipSettings } from '@/types/components/view/chip';
import { ProductCategory } from '@/types/components/model/larekApi';
import { ElementCreator } from '@/types/html';
import { createElement } from '@/utils/utils';

export class ChipView extends View<ChipData, ChipSettings> {
	set category(value: ProductCategory) {
		this.setValue(this.element, this.settings.labels[value]);
		this.toggleClass(this.element, this.settings.classes[value], true);
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
