import { Controller } from './controller';
import { IAppState, AppStateModals } from '@/types/components/model/appState';
import { PaymentMethod } from '@/types/components/model/larekApi';
import { OrderFormField } from '@/types/components/view/form';
import { OrderScreenSettings } from '@/components/view/OrderScreen';

/**
 * Контроллер формы заказа (шаг 1).
 * Реализует OrderScreenSettings — Controller = Settings.
 */
export class OrderController
	extends Controller<IAppState>
	implements OrderScreenSettings
{
	/**
	 * Изменение способа оплаты
	 */
	onPaymentChange = (method: PaymentMethod) => {
		this.model.orderValidator.setValue('payment', method);
		this.model.notifyOrderChange();
	};

	/**
	 * Изменение поля формы
	 */
	onFieldChange = (field: OrderFormField, value: string) => {
		this.model.orderValidator.setValue(field, value);
		this.model.notifyOrderChange();
	};

	/**
	 * Submit формы — переход к контактам
	 */
	onSubmit = () => {
		if (!this.model.orderValidator.valid) return;
		this.model.openModal(AppStateModals.contacts);
	};

	/**
	 * Закрыть модалку
	 */
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
