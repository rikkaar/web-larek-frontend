import { Controller } from './controller';
import { IAppState, AppStateModals } from '@/types/components/model/appState';
import { ProductId } from '@/types/components/model/larekApi';
import { PageScreenSettings } from '@/components/view/PageScreen';

/**
 * Контроллер главной страницы.
 * Реализует PageScreenSettings — Controller = Settings.
 */
export class PageController
	extends Controller<IAppState>
	implements PageScreenSettings
{
	/**
	 * Клик по карточке продукта
	 */
	onProductClick = (id: ProductId) => {
		this.model.selectProduct(id);
		this.model.openModal(AppStateModals.product);
	};

	/**
	 * Клик по кнопке корзины
	 */
	onBasketClick = () => {
		this.model.openModal(AppStateModals.basket);
	};
}
