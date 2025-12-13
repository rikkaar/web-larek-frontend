import { View } from '@/components/base/View';
import { ChipData, ChipSettings } from '@/types/components/view/chip';
import { ProductCategory } from '@/types/components/model/larekApi';
import { ElementCreator } from '@/types/html';
import { createElement } from '@/utils/utils';

/**
 * Простой View для отображения категории (chip/tag).
 * Только отображение, без интерактивности.
 * Создаётся один раз, категория не меняется.
 *
 * @example
 * // Через конструктор
 * const chip = new ChipView(element, settings.chip);
 * chip.render({ category: 'софт-скил' });
 *
 * // Через фабрику
 * const el = ChipView.create('софт-скил', ['span', { className: 'card__category' }], settings.chip);
 */
export class ChipView extends View<ChipData, ChipSettings> {
	/**
	 * Сеттер для категории — устанавливает label и CSS-класс из settings
	 */
	set category(value: ProductCategory) {
		this.setValue(this.element, this.settings.labels[value]);
		this.toggleClass(this.element, this.settings.classes[value], true);
	}

	/**
	 * Фабричный метод для быстрого создания чипа.
	 * Возвращает готовый HTMLElement.
	 *
	 * @param category — категория продукта
	 * @param creator — настройки для createElement [tagName, props]
	 * @param settings — маппинги labels и classes
	 */
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
