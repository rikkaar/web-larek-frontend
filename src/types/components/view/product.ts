import {
	ProductId,
	ProductCategory,
	NormalizedProduct,
} from '@/types/components/model/larekApi';
import { IView } from '@/types/components/base/view';
import { ButtonData } from './button';
import { ChipData } from './chip';
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

	categoryView: IView<ChipData>;

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

export interface ProductScreenData extends NormalizedProduct {
	isInBasket: boolean;

	isActive?: boolean;
}
