import { View } from '@/components/base/View';
import {
	OptionGroupData,
	OptionGroupSettings,
	Option,
} from '@/types/components/view/optionGroup';

/**
 * View для группы опций — выбор одной из нескольких.
 * Управляет активным состоянием кнопок.
 *
 * @template T — тип значения опции (например, PaymentMethod)
 *
 * @example
 * const optionGroup = new OptionGroupView(containerEl, {
 *   options: [
 *     { value: 'online', view: cardButtonView },
 *     { value: 'cash', view: cashButtonView },
 *   ],
 *   onSelect: (method) => controller.setPayment(method),
 * });
 *
 * optionGroup.render({ selected: 'online' });
 */
export class OptionGroupView<T> extends View<
	OptionGroupData<T>,
	OptionGroupSettings<T>
> {
	/**
	 * Сеттер для выбранного значения — обновляет active у всех кнопок
	 */
	set selected(value: T | null) {
		for (const option of this.settings.options) {
			option.view.render({ active: option.value === value });
		}
	}
}

