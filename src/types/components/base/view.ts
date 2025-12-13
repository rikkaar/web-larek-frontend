export interface IView<T, S = object, E extends HTMLElement = HTMLElement> {
	element: E; // корневой элемент
	copy(settings?: S): IView<T, S, E>; // копирующий конструктор
	render(data?: Partial<T>): E; // метод рендера
}


// Настройки для кликабельного отображения (кнопки, карточки...)
export type IClickableEvent<T> = { event: MouseEvent; item?: T };
export interface IClickable<T> {
	onClick: (args: IClickableEvent<T>) => void;
}

// Настройки для изменяемого отображения (формы, переключатели...)
export type IChangeableEvent<T> = { event: Event; value?: T };
export interface IChangeable<T> {
	onChange: (args: IChangeableEvent<T>) => void;
}

// Настройки для выбираемого отображения (списки, таблицы...)
export type ISelectableEvent<T> = { event: Event; value?: T };
export interface ISelectable<T> {
	onSelect: (args: ISelectableEvent<T>) => void;
}
