import { Controller } from './controller';
import { IAppState, AppStateModals } from '@/types/components/model/appState';
import { ProductId } from '@/types/components/model/larekApi';
import { BasketScreenSettings } from '@/components/view/BasketScreen';

export class BasketController
	extends Controller<IAppState>
	implements BasketScreenSettings
{
	onRemove = (id: ProductId) => {
		this.model.removeFromBasket(id);
	};

	onCheckout = () => {
		this.model.openModal(AppStateModals.order);
	};

	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
