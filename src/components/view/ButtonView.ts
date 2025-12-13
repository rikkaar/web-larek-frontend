import { View } from '@/components/base/View';
import { ButtonData, ButtonSettings } from '@/types/components/view/button';
import { ElementCreator } from '@/types/html';
import { createElement } from '@/utils/utils';

/**
 * Отображение типовой кнопки.
 *
 * @template T — тип данных, передаваемых в onClick (например, ProductId)
 *
 */
export class ButtonView<T = void> extends View<
	ButtonData,
	ButtonSettings<T>,
	HTMLButtonElement
> {
	/**
	 * Инициализация: навешиваем обработчик клика
	 */
	protected init(): void {
		this.element.addEventListener('click', this.handleClick);
	}

	/**
	 * Обработчик клика с привязкой контекста через стрелочную функцию
	 */
	private handleClick = (event: MouseEvent): void => {
		this.settings.onClick({ event });
	};

	/**
	 * Сеттер для текста кнопки
	 */
	set label(value: string) {
		this.setValue(this.element, value);
	}

	/**
	 * Сеттер для disabled-состояния
	 */
	set disabled(value: boolean) {
		this.setDisabled(this.element, value);
	}

	/**
	 * Сеттер для активного состояния (если activeClass указан в settings)
	 */
	set active(value: boolean) {
		if (this.settings.activeClass) {
			this.toggleClass(this.element, this.settings.activeClass, value);
		}
	}

	/**
	 * Фабричный метод для быстрого создания кнопки.
	 * Возвращает готовый HTMLButtonElement.
	 *
	 * @param label — текст кнопки
	 * @param creator — настройки для createElement [tagName, props]
	 * @param onClick — обработчик клика
	 */
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

