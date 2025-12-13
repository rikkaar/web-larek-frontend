import { IView } from '@/types/components/base/view';
import { SelectorElement, ElementChild, ElementValue } from '@/types/html';
import {
	ensureElement,
	isSelector,
	isPlainObject,
	isChildElement,
} from '@/utils/utils';

/**
 * Базовый абстрактный класс для всех View-компонентов.
 * Реализует паттерн «Шаблон» (Template Method) с методами жизненного цикла.
 *
 * @template T - тип данных для рендеринга
 * @template S - тип настроек компонента (callbacks, вложенные View)
 */
export abstract class View<T, S extends object = object>
	implements IView<T, S>
{
	/**
	 * Трюк для копирующего конструктора:
	 * позволяет создавать экземпляр дочернего класса, не зная его имени
	 */
	['constructor']!: new (element: HTMLElement, settings: S) => this;

	/**
	 * Кеш DOM-элементов для оптимизации повторных запросов
	 */
	protected cache: Record<string, HTMLElement> = {};

	/**
	 * @param element - корневой DOM-элемент компонента
	 * @param settings - настройки компонента (callbacks, вложенные View)
	 */
	constructor(
		public readonly element: HTMLElement,
		protected readonly settings: S
	) {
		this.init();
		if (!this.element) {
			throw new Error('View: element is not defined');
		}
	}

	/**
	 * Метод жизненного цикла: инициализация.
	 * Вызывается в конструкторе. Переопределяется в дочерних классах
	 * для создания элементов, навешивания слушателей и т.д.
	 */
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	protected init(): void {}

	/**
	 * Копирующий конструктор.
	 * Клонирует element и объединяет settings.
	 * Используется для создания множества однотипных View (например, карточек).
	 */
	copy(settings?: Partial<S>): this {
		return new this.constructor(
			this.element.cloneNode(true) as HTMLElement,
			Object.assign({}, this.settings, settings ?? {})
		);
	}

	/**
	 * Рендер компонента с данными.
	 * Использует Object.assign для установки свойств через сеттеры.
	 *
	 * @param data - частичные данные для обновления
	 * @returns корневой элемент
	 */
	render(data?: Partial<T>): HTMLElement {
		if (data && typeof data === 'object') {
			Object.assign(this, data);
		}
		return this.element;
	}

	// =========================================================================
	// Вспомогательные методы для работы с DOM
	// =========================================================================

	/**
	 * Находит элемент по селектору с кешированием.
	 * При повторном вызове с тем же селектором возвращает закешированный элемент.
	 */
	protected ensure<E extends HTMLElement>(
		query: SelectorElement<E>,
		root: HTMLElement = this.element
	): E {
		if (!isSelector(query)) {
			return ensureElement(query);
		}
		if (!this.cache[query]) {
			this.cache[query] = ensureElement(query, root);
		}
		return this.cache[query] as E;
	}

	/**
	 * Устанавливает текстовое содержимое элемента.
	 */
	protected setText(query: SelectorElement<HTMLElement>, value: string): void {
		const el = this.ensure(query);
		el.textContent = value;
	}

	/**
	 * Устанавливает изображение.
	 */
	protected setImage(
		query: SelectorElement<HTMLImageElement>,
		src: string,
		alt?: string
	): void {
		const el = this.ensure(query);
		el.src = src;
        el.alt = alt;
	}

	/**
	 * Устанавливает disabled-состояние элемента.
	 */
	protected setDisabled(
		query: SelectorElement<HTMLButtonElement>,
		disabled: boolean
	): void {
		const el = this.ensure(query);
		el.disabled = disabled;
	}

	/**
	 * Переключает CSS-класс на элементе.
	 */
	protected toggleClass(
		query: SelectorElement<HTMLElement>,
		className: string,
		force?: boolean
	): void {
		const el = this.ensure(query);
		el.classList.toggle(className, force);
	}

	/**
	 * Устанавливает видимость элемента.
	 */
	protected setVisible(
		query: SelectorElement<HTMLElement>,
		isVisible: boolean
	): void {
		const el = this.ensure(query);
		if (isVisible) {
			el.style.removeProperty('display');
		} else {
			el.style.display = 'none';
		}
	}

	/**
	 * Скрывает элемент (display: none).
	 */
	protected setHidden(
		query: SelectorElement<HTMLElement>,
		hidden: boolean
	): void {
		this.setVisible(query, !hidden);
	}

	/**
	 * Заменяет содержимое контейнера на новые элементы.
	 */
	protected setChildren(
		query: SelectorElement<HTMLElement>,
		children: ElementChild
	): void {
		const el = this.ensure(query);
		el.replaceChildren(...(Array.isArray(children) ? children : [children]));
	}

	/**
	 * Универсальная установка значения элемента.
	 * Поддерживает: string (textContent), HTMLElement/HTMLElement[] (children), object (props).
	 */
	protected setValue<E extends HTMLElement>(
		query: SelectorElement<E>,
		value: ElementValue<E>
	): void {
		const el = this.ensure(query);
		if (typeof value === 'string') {
			el.textContent = value;
		} else if (isChildElement(value)) {
			el.replaceChildren(...(Array.isArray(value) ? value : [value]));
		} else if (isPlainObject(value)) {
			Object.assign(el, value);
		}
	}
}

