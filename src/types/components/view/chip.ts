import { ProductCategory } from '@/types/components/model/larekApi';

export interface ChipData {
	category: ProductCategory;
}

export type ChipLabelMap = Record<ProductCategory, string>;

export type ChipClassMap = Record<ProductCategory, string>;

export interface ChipSettings {
	labels: ChipLabelMap;
	classes: ChipClassMap;
}
