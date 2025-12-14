import {
	IAppState,
	AppStateSettings,
	AppStateChanges,
	AppStateModals,
} from '@/types/components/model/appState';
import { Product, ProductId, NormalizedProduct, ILarekApi } from '@/types/components/model/larekApi';
import { IFormValidator } from '@/types/components/common/formValidator';
import { OrderFormValues, ContactsFormValues } from '@/types/components/common/formSchemas';

/**
 * Нормализует продукт: price null → 0
 */
function normalizeProduct(product: Product): NormalizedProduct {
	return {
		...product,
		price: product.price ?? 0,
	};
}

/**
 * Модель состояния приложения.
 *
 * Хранит данные и предоставляет методы для их изменения.
 * При изменении данных вызывает notifyChanged().
 *
 * @example
 * const app = new AppStateEmitter(api, AppState, { orderValidator, contactsValidator });
 *
 * app.on(AppStateChanges.basket, () => {
 *   console.log('Basket:', app.model.getBasketCount());
 * });
 *
 * app.model.addToBasket(productId);
 */
export class AppState implements IAppState {
	// =========================================================================
	// Приватные поля
	// =========================================================================

	/** Каталог продуктов (Map для быстрого доступа по ID) */
	private _products: Map<ProductId, NormalizedProduct> = new Map();

	/** Корзина (Set для уникальности) */
	private _basket: Set<ProductId> = new Set();

	/** Текущее модальное окно */
	private _openedModal: AppStateModals = AppStateModals.none;

	/** ID выбранного продукта */
	private _selectedProduct: ProductId | null = null;

	/** Настройки (onChange, валидаторы) */
	private readonly settings: AppStateSettings;

	// =========================================================================
	// Конструктор
	// =========================================================================

	constructor(_api: ILarekApi, settings: AppStateSettings) {
		this.settings = settings;
	}

	/**
	 * Уведомить об изменении состояния
	 */
	protected notifyChanged(changed: AppStateChanges): void {
		this.settings.onChange(changed);
	}

	// =========================================================================
	// Каталог продуктов
	// =========================================================================

	get products(): NormalizedProduct[] {
		return Array.from(this._products.values());
	}

	setProducts(products: Product[]): void {
		this._products.clear();
		for (const product of products) {
			const normalized = normalizeProduct(product);
			this._products.set(normalized.id, normalized);
		}
		this.notifyChanged(AppStateChanges.products);
	}

	getProduct(id: ProductId): NormalizedProduct | undefined {
		return this._products.get(id);
	}

	// =========================================================================
	// Корзина
	// =========================================================================

	get basket(): ProductId[] {
		return Array.from(this._basket);
	}

	addToBasket(id: ProductId): void {
		if (this._basket.has(id)) return;

		this._basket.add(id);
		this.notifyChanged(AppStateChanges.basket);
	}

	removeFromBasket(id: ProductId): void {
		if (!this._basket.has(id)) return;

		this._basket.delete(id);
		this.notifyChanged(AppStateChanges.basket);
	}

	clearBasket(): void {
		if (this._basket.size === 0) return;

		this._basket.clear();
		this.notifyChanged(AppStateChanges.basket);
	}

	isInBasket(id: ProductId): boolean {
		return this._basket.has(id);
	}

	getBasketTotal(): number {
		return this.getBasketProducts().reduce((sum, product) => sum + product.price, 0);
	}

	getBasketCount(): number {
		return this._basket.size;
	}

	getBasketProducts(): NormalizedProduct[] {
		return Array.from(this._basket, (id) => this._products.get(id));
	}

	// =========================================================================
	// Модальные окна
	// =========================================================================

	get openedModal(): AppStateModals {
		return this._openedModal;
	}

	openModal(modal: AppStateModals): void {
		if (this._openedModal === modal) return;

		this._openedModal = modal;
		this.notifyChanged(AppStateChanges.modal);
	}

	// =========================================================================
	// Выбранный продукт
	// =========================================================================

	get selectedProduct(): ProductId | null {
		return this._selectedProduct;
	}

	selectProduct(id: ProductId): void {
		this._selectedProduct = id;
	}

	// =========================================================================
	// Валидаторы форм
	// =========================================================================

	get orderValidator(): IFormValidator<OrderFormValues> {
		return this.settings.orderValidator;
	}

	get contactsValidator(): IFormValidator<ContactsFormValues> {
		return this.settings.contactsValidator;
	}

	resetValidators(): void {
		this.settings.orderValidator.reset();
		this.settings.contactsValidator.reset();
	}
}
