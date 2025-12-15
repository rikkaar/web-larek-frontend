import { IView } from '@/types/components/base/view';
import { HeaderBasketData } from './headerBasket';
import { ProductId, Product } from '@/types/components/model/larekApi';

export interface PageData {
	basket: HeaderBasketData;

	gallery: HTMLElement[];

	locked: boolean;
}

export interface PageSettings {
	wrapperSelector: string;
	gallerySelector: string;

	lockedClass: string;

	basketView: IView<HeaderBasketData>;
}

export interface PageScreenSettings {
	onProductClick: (id: ProductId) => void;
	onBasketClick: () => void;
}

export interface PageScreenData {
	products?: Product[];
	basketCount?: number;
	locked?: boolean;
}
