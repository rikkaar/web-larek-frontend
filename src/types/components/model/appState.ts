/**
 * Типы для модели состояния приложения (AppState)
 *
 * AppState — единственный источник правды для данных приложения.
 * Валидаторы форм передаются через настройки (DI).
 * Типы форм выводятся из zod-схем (infer).
 */

import { Product, ProductId, NormalizedProduct, ILarekApi } from './larekApi';
import { IFormValidator } from '../common/formValidator';
import { OrderFormValues, ContactsFormValues } from '../common/formSchemas';

/**
 * Состояния модальных окон
 */
export enum AppStateModals {
	none = 'modal:none',
	product = 'modal:product',
	basket = 'modal:basket',
	order = 'modal:order',
	contacts = 'modal:contacts',
	success = 'modal:success',
}

/**
 * События изменения состояния модели
 */
export enum AppStateChanges {
	/** Загружен список продуктов */
	products = 'state:products',
	/** Изменилась корзина (добавление/удаление товара) */
	basket = 'state:basket',
	/** Изменилось состояние модального окна */
	modal = 'state:modal',
}

/**
 * Настройки AppState
 */
export interface AppStateSettings {
	/** Callback при изменении состояния модели */
	onChange: (changed: AppStateChanges) => void;
	/** Валидатор формы заказа (шаг 1) */
	orderValidator: IFormValidator<OrderFormValues>;
	/** Валидатор формы контактов (шаг 2) */
	contactsValidator: IFormValidator<ContactsFormValues>;
}

/**
 * Интерфейс состояния приложения
 */
export interface IAppState {
	// =========================================================================
	// Каталог продуктов
	// =========================================================================

	/** Список всех продуктов (нормализованных) */
	products: NormalizedProduct[];

	/** Загрузить продукты в каталог (нормализует price: null → 0) */
	setProducts(products: Product[]): void;

	/** Получить продукт по ID */
	getProduct(id: ProductId): NormalizedProduct | undefined;

	// =========================================================================
	// Корзина
	// =========================================================================

	/** ID товаров в корзине */
	basket: ProductId[];

	/** Добавить товар в корзину */
	addToBasket(id: ProductId): void;

	/** Удалить товар из корзины */
	removeFromBasket(id: ProductId): void;

	/** Очистить корзину (вызывается после успешного заказа) */
	clearBasket(): void;

	/** Проверить, есть ли товар в корзине */
	isInBasket(id: ProductId): boolean;

	/** Получить общую сумму корзины */
	getBasketTotal(): number;

	/** Получить количество товаров в корзине */
	getBasketCount(): number;

	/** Получить список продуктов в корзине */
	getBasketProducts(): NormalizedProduct[];

	// =========================================================================
	// Модальные окна
	// =========================================================================

	/** Текущее открытое модальное окно */
	openedModal: AppStateModals;

	/** Открыть модальное окно */
	openModal(modal: AppStateModals): void;

	// =========================================================================
	// Выбранный продукт (для модалки продукта)
	// =========================================================================

	/** ID выбранного продукта (для отображения в модалке) */
	selectedProduct: ProductId | null;

	/** Выбрать продукт для просмотра */
	selectProduct(id: ProductId): void;

	// =========================================================================
	// Валидаторы форм (передаются через настройки)
	// =========================================================================

	/** Валидатор формы заказа */
	readonly orderValidator: IFormValidator<OrderFormValues>;

	/** Валидатор формы контактов */
	readonly contactsValidator: IFormValidator<ContactsFormValues>;

	/** Сбросить валидаторы (после успешного заказа) */
	resetValidators(): void;
}

/**
 * Конструктор AppState (для DI)
 */
export interface AppStateConstructor {
	new (api: ILarekApi, settings: AppStateSettings): IAppState;
}
