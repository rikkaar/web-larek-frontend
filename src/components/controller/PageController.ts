import { Controller } from './controller';
import { IAppState, AppStateModals } from '@/types/components/model/appState';
import { ProductId } from '@/types/components/model/larekApi';
import { PageScreenSettings } from '@/components/view/PageScreen';

export class PageController
	extends Controller<IAppState>
	implements PageScreenSettings
{
	onProductClick = (id: ProductId) => {
		this.model.selectProduct(id);
		this.model.openModal(AppStateModals.product);
	};

	onBasketClick = () => {
		this.model.openModal(AppStateModals.basket);
	};
}
