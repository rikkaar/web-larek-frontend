import { View } from '@/components/base/View';
import { ModalTitleData } from '@/types/components/view/modal';

export class ModalTitleView extends View<ModalTitleData, object> {
	set title(value: string) {
		this.setValue(this.element, value);
	}
}
