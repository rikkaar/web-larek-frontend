import { Controller } from './controller';
import { IAppState, AppStateModals } from '@/types/components/model/appState';
import { ProductId } from '@/types/components/model/larekApi';
import { BasketScreenSettings } from '@/components/view/BasketScreen';

/**
 * Контроллер корзины.
 *
 * Реализует BasketScreenSettings — Controller = Settings.
 *
 * @example
 * const basketScreen = new BasketScreen(new BasketController(app.model));
 */
export class BasketController
	extends Controller<IAppState>
	implements BasketScreenSettings
{
	/**
	 * Удалить товар из корзины
	 */
	onRemove = (id: ProductId) => {
		this.model.removeFromBasket(id);
	};

	/**
	 * Перейти к оформлению
	 */
	onCheckout = () => {
		this.model.openModal(AppStateModals.order);
	};

	/**
	 * Закрыть модалку
	 */
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
