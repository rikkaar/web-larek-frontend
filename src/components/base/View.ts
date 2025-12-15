import { IView } from '@/types/components/base/view';
import {
	SelectorElement,
	ElementValue,
	DisableableElement,
} from '@/types/html';
import {
	ensureElement,
	isSelector,
	isPlainObject,
	isChildElement,
} from '@/utils/utils';

export abstract class View<
	T,
	S extends object = object,
	E extends HTMLElement = HTMLElement
> implements IView<T, S, E>
{
	['constructor']!: new (element: E, settings: S) => this;

	protected cache: Record<string, HTMLElement> = {};

	constructor(public element: E, protected readonly settings: S) {
		this.init();
		if (!this.element) {
			throw new Error('Element is not defined');
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	protected init(): void {}

	copy(settings?: Partial<S>): this {
		return new this.constructor(
			this.element.cloneNode(true) as E,
			Object.assign({}, this.settings, settings ?? {})
		);
	}

	render(data?: Partial<T>): E {
		if (data && typeof data === 'object') {
			Object.assign(this, data);
		}
		return this.element;
	}

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

	protected setImage(
		query: SelectorElement<HTMLImageElement>,
		src: string,
		alt?: string
	): void {
		const el = this.ensure(query);
		el.src = src;
		el.alt = alt ?? '';
	}

	protected setDisabled(
		query: SelectorElement<DisableableElement>,
		disabled: boolean
	): void {
		const el = this.ensure(query);
		el.disabled = disabled;
	}

	protected toggleClass(
		query: SelectorElement<HTMLElement>,
		className: string,
		force?: boolean
	): void {
		const el = this.ensure(query);
		el.classList.toggle(className, force);
	}

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
