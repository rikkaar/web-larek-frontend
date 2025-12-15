import { Controller } from './controller';
import { IAppState, AppStateModals } from '@/types/components/model/appState';
import { PaymentMethod } from '@/types/components/model/larekApi';
import { OrderFormField } from '@/types/components/view/form';
import { OrderScreenSettings } from '@/components/view/OrderScreen';

export class OrderController
	extends Controller<IAppState>
	implements OrderScreenSettings
{
	onPaymentChange = (method: PaymentMethod) => {
		this.model.orderValidator.setValue('payment', method);
		this.model.notifyOrderChange();
	};

	onFieldChange = (field: OrderFormField, value: string) => {
		this.model.orderValidator.setValue(field, value);
		this.model.notifyOrderChange();
	};

	onSubmit = () => {
		if (!this.model.orderValidator.valid) return;
		this.model.openModal(AppStateModals.contacts);
	};

	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
