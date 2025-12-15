import { ProductId } from '@/types/components/model/larekApi';
import { IView } from '@/types/components/base/view';
import { ButtonData } from './button';
import { ModalScreenSettings } from './screen';

export interface BasketProductData {
	id: ProductId;
	index: number;
	title: string;
	price: number;
}

export interface BasketProductSettings {
	indexSelector: string;
	titleSelector: string;
	priceSelector: string;
	deleteSelector: string;

	onDelete: (id: ProductId) => void;

	formatPrice: (value: number) => string;
}

export interface BasketModalData {
	items: BasketProductData[];
	total: number;
	button: ButtonData;
}

export interface BasketModalSettings {
	listSelector: string;
	priceSelector: string;

	itemView: IView<BasketProductData>;
	buttonView: IView<ButtonData>;

	formatPrice: (value: number) => string;
}

export interface BasketScreenSettings extends ModalScreenSettings {
	onRemove: (id: ProductId) => void;

	onCheckout: () => void;
}

export interface BasketScreenData {
	items: BasketProductData[];
	total: number;
	isDisabled?: boolean;
	isActive?: boolean;
}
