import { Controller } from './controller';
import { IAppState, AppStateModals } from '@/types/components/model/appState';
import { ProductScreenSettings } from '@/components/view/ProductScreen';

/**
 * Контроллер модалки продукта.
 *
 * Реализует ProductScreenSettings — Controller = Settings.
 * Screen использует this.settings.onToggleBasket, this.settings.onClose.
 *
 * @example
 * const productScreen = new ProductScreen(new ProductController(app.model));
 */
export class ProductController
	extends Controller<IAppState>
	implements ProductScreenSettings
{
	/**
	 * Добавить/убрать товар из корзины
	 */
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

	/**
	 * Закрыть модалку
	 */
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
