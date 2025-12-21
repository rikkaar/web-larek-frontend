import {
	ProductId,
	ProductCategory,
	Product,
} from '@/types/components/model/larekApi';
import { ButtonData } from './button';
import { ModalScreenSettings } from './screen';

export interface ProductPreviewData {
	id: ProductId;
	title: string;
	image: string;
	price: number | null;
	category: ProductCategory;
}

export interface ProductPreviewSettings {
	titleSelector: string;
	imageSelector: string;
	priceSelector: string;
	onClick: (id: ProductId) => void;
	formatPrice: (value: number | null) => string;
}

export interface ProductModalData {
	title: string;
	image: string;
	price: number | null;
	category: ProductCategory;
	description: string;
	button: ButtonData;
}

export interface ProductModalSettings {
	onToggleBasket: () => void;
	formatPrice: (value: number | null) => string;
}

export interface ProductScreenSettings extends ModalScreenSettings {
	onToggleBasket: () => void;
}

export interface ProductScreenData extends Product {
	button: ButtonData;
	isActive?: boolean;
}
