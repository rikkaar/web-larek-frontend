import { Product, ProductId, NormalizedProduct, ILarekApi } from './larekApi';
import { IFormValidator } from '../common/formValidator';
import { OrderFormValues, ContactsFormValues } from '../common/formSchemas';

export enum AppStateModals {
	none = 'modal:none',
	product = 'modal:product',
	basket = 'modal:basket',
	order = 'modal:order',
	contacts = 'modal:contacts',
	success = 'modal:success',
}

export enum AppStateChanges {
	products = 'state:products',

	basket = 'state:basket',

	modal = 'state:modal',

	order = 'state:order',

	contacts = 'state:contacts',
}

export interface AppStateSettings {
	onChange: (changed: AppStateChanges) => void;

	orderValidator: IFormValidator<OrderFormValues>;

	contactsValidator: IFormValidator<ContactsFormValues>;
}

export interface IAppState {
	products: NormalizedProduct[];

	setProducts(products: Product[]): void;

	getProduct(id: ProductId): NormalizedProduct | undefined;

	basket: ProductId[];

	addToBasket(id: ProductId): void;

	removeFromBasket(id: ProductId): void;

	clearBasket(): void;

	isInBasket(id: ProductId): boolean;

	getBasketTotal(): number;

	getBasketCount(): number;

	getBasketProducts(): NormalizedProduct[];

	openedModal: AppStateModals;

	openModal(modal: AppStateModals): void;

	selectedProduct: ProductId | null;

	selectProduct(id: ProductId): void;

	readonly orderValidator: IFormValidator<OrderFormValues>;

	readonly contactsValidator: IFormValidator<ContactsFormValues>;

	resetValidators(): void;

	notifyOrderChange(): void;

	notifyContactsChange(): void;
}

export interface AppStateConstructor {
	new (api: ILarekApi, settings: AppStateSettings): IAppState;
}
