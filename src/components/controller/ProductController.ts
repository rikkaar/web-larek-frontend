import { Controller } from './controller';
import { IAppState, AppStateModals } from '@/types/components/model/appState';
import { ProductScreenSettings } from '@/components/view/ProductScreen';

export class ProductController
	extends Controller<IAppState>
	implements ProductScreenSettings
{
	onToggleBasket = () => {
		const productId = this.model.selectedProduct;
		if (!productId) return;

		const isInBasket = this.model.isInBasket(productId);

		if (isInBasket) {
			this.model.removeFromBasket(productId);
		} else {
			this.model.addToBasket(productId);
		}
	};

	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
