import {
	IAppState,
	AppStateSettings,
	AppStateChanges,
	AppStateModals,
} from '@/types/components/model/appState';
import {
	Product,
	ProductId,
	NormalizedProduct,
	ILarekApi,
} from '@/types/components/model/larekApi';
import { IFormValidator } from '@/types/components/common/formValidator';
import {
	OrderFormValues,
	ContactsFormValues,
} from '@/types/components/common/formSchemas';

function normalizeProduct(product: Product): NormalizedProduct {
	return {
		...product,
		price: product.price ?? 0,
	};
}

export class AppState implements IAppState {
	private _products: Map<ProductId, NormalizedProduct> = new Map();
	private _basket: Set<ProductId> = new Set();
	private _openedModal: AppStateModals = AppStateModals.none;
	private _selectedProduct: ProductId | null = null;
	private readonly settings: AppStateSettings;

	constructor(_api: ILarekApi, settings: AppStateSettings) {
		this.settings = settings;
	}

	protected notify(changed: AppStateChanges): void {
		this.settings.onChange(changed);
	}

	get products(): NormalizedProduct[] {
		return Array.from(this._products.values());
	}

	setProducts(products: Product[]): void {
		this._products.clear();
		for (const product of products) {
			const normalized = normalizeProduct(product);
			this._products.set(normalized.id, normalized);
		}
		this.notify(AppStateChanges.products);
	}

	getProduct(id: ProductId): NormalizedProduct | undefined {
		return this._products.get(id);
	}

	get basket(): ProductId[] {
		return Array.from(this._basket);
	}

	addToBasket(id: ProductId): void {
		if (this._basket.has(id)) return;

		this._basket.add(id);
		this.notify(AppStateChanges.basket);
	}

	removeFromBasket(id: ProductId): void {
		if (!this._basket.has(id)) return;

		this._basket.delete(id);
		this.notify(AppStateChanges.basket);
	}

	clearBasket(): void {
		if (this._basket.size === 0) return;

		this._basket.clear();
		this.notify(AppStateChanges.basket);
	}

	isInBasket(id: ProductId): boolean {
		return this._basket.has(id);
	}

	getBasketTotal(): number {
		return this.getBasketProducts().reduce(
			(sum, product) => sum + product.price,
			0
		);
	}

	getBasketCount(): number {
		return this._basket.size;
	}

	getBasketProducts(): NormalizedProduct[] {
		return Array.from(this._basket, (id) => this._products.get(id));
	}

	get openedModal(): AppStateModals {
		return this._openedModal;
	}

	openModal(modal: AppStateModals): void {
		if (this._openedModal === modal) return;

		this._openedModal = modal;
		this.notify(AppStateChanges.modal);
	}

	get selectedProduct(): ProductId | null {
		return this._selectedProduct;
	}

	selectProduct(id: ProductId): void {
		this._selectedProduct = id;
	}

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

	notifyOrderChange(): void {
		this.notify(AppStateChanges.order);
	}

	notifyContactsChange(): void {
		this.notify(AppStateChanges.contacts);
	}
}
