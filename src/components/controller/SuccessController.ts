import { Controller } from './controller';
import { IAppState, AppStateModals } from '@/types/components/model/appState';
import { SuccessScreenSettings } from '@/components/view/SuccessScreen';

/**
 * Контроллер успешного заказа.
 * Реализует SuccessScreenSettings — Controller = Settings.
 */
export class SuccessController
	extends Controller<IAppState>
	implements SuccessScreenSettings
{
	/**
	 * Закрыть модалку, очистить корзину и сбросить валидаторы
	 */
	onClose = () => {
		this.model.clearBasket();
		this.model.resetValidators();
		this.model.openModal(AppStateModals.none);
	};
}
