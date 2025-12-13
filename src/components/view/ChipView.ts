import { View } from '@/components/base/View';
import { ChipData, ChipColor, ChipSettings } from '@/types/components/view/chip';
import { ElementCreator } from '@/types/html';
import { createElement } from '@/utils/utils';

/**
 * Простой View для отображения категории (chip/tag).
 * Только отображение, без интерактивности.
 * Создаётся один раз, цвет не меняется.
 *
 * @example
 * // Через конструктор
 * const chip = new ChipView(element, settings.chip);
 * chip.render({ color: 'soft' });
 *
 * // Через фабрику
 * const el = ChipView.create('soft', ['span', { className: 'card__category' }], settings.chip);
 */
export class ChipView extends View<ChipData, ChipSettings> {
	/**
	 * Сеттер для цвета — устанавливает label и CSS-класс из settings
	 */
	set color(value: ChipColor) {
		this.setValue(this.element, this.settings.labels[value]);
		this.toggleClass(this.element, this.settings.classes[value], true);
	}

	/**
	 * Фабричный метод для быстрого создания чипа.
	 * Возвращает готовый HTMLElement.
	 *
	 * @param color — цвет чипа
	 * @param creator — настройки для createElement [tagName, props]
	 * @param settings — маппинги labels и classes
	 */
	static create(
		color: ChipColor,
		creator: ElementCreator,
		settings: ChipSettings
	): HTMLElement {
		const element = createElement(...creator);
		const view = new ChipView(element, settings);
		return view.render({ color });
	}
}
