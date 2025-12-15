import { IClickable } from '@/types/components/base/view';

export interface HeaderBasketData {
	counter: number;
}

export interface HeaderBasketSettings extends IClickable<void> {
	counterSelector: string;
}
