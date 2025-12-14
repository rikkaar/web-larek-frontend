import { IView } from '@/types/components/base/view';
import { SelectorElement, ElementValue, DisableableElement } from '@/types/html';
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
 * @template E - тип корневого DOM-элемента (по умолчанию HTMLElement)
 */
export abstract class View<
	T,
	S extends object = object,
	E extends HTMLElement = HTMLElement
> implements IView<T, S, E>
{
	/**
	 * Трюк для копирующего конструктора:
	 * позволяет создавать экземпляр дочернего класса, не зная его имени
	 */
	['constructor']!: new (element: E, settings: S) => this;

	/**
	 * Кеш DOM-элементов для оптимизации повторных запросов
	 */
	protected cache: Record<string, HTMLElement> = {};

	/**
	 * @param element - корневой DOM-элемент компонента
	 * @param settings - настройки компонента (callbacks, вложенные View)
	 */
	constructor(
		public element: E, // не readonly — Screen устанавливает в init()
		protected readonly settings: S
	) {
		this.init();
		if (!this.element) {
			throw new Error('Element is not defined');
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
			this.element.cloneNode(true) as E,
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
	render(data?: Partial<T>): E {
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
	protected ensure<T extends HTMLElement>(
		query: SelectorElement<T>,
		root: HTMLElement = this.element
	): T {
		if (!isSelector(query)) {
			return ensureElement(query);
		}
		if (!this.cache[query]) {
			this.cache[query] = ensureElement(query, root);
		}
		return this.cache[query] as T;
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
		el.alt = alt ?? '';
	}

	/**
	 * Устанавливает disabled-состояние элемента.
	 */
	protected setDisabled(
		query: SelectorElement<DisableableElement>,
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
	 * Универсальная установка значения элемента.
	 * Поддерживает: string (textContent), HTMLElement/HTMLElement[] (children), object (props).
	 */
	protected setValue<T extends HTMLElement>(
		query: SelectorElement<T>,
		value: ElementValue<T>
	): void {
		const el = query instanceof HTMLElement ? query : this.ensure(query);
		if (typeof value === 'string') {
			el.textContent = value;
		} else if (isChildElement(value)) {
			el.replaceChildren(...(Array.isArray(value) ? value : [value]));
		} else if (isPlainObject(value)) {
			Object.assign(el, value);
		}
	}
}
