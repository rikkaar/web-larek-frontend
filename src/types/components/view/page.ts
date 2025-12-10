/**
 * Типы для Page View (главная страница)
 */

/**
 * Данные для страницы
 */
export interface PageData {
	/** Счетчик корзины */
	basketCounter: number;
	/** Элементы галереи */
	gallery: HTMLElement[];
	/** Заблокирована ли страница (при открытой модалке) */
	locked: boolean;
}

/**
 * Настройки для страницы
 */
export interface PageSettings {
	/** Клик по кнопке корзины */
	onBasketClick: () => void;
}
