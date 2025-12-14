import { Controller } from './controller';
import { IAppState, AppStateModals } from '@/types/components/model/appState';
import { ILarekApi } from '@/types/components/model/larekApi';
import { ContactsFormField } from '@/types/components/view/form';
import { ContactsScreenSettings } from '@/components/view/ContactsScreen';

/**
 * Контроллер формы контактов (шаг 2).
 * Реализует ContactsScreenSettings — Controller = Settings.
 */
export class ContactsController
	extends Controller<IAppState>
	implements ContactsScreenSettings
{
	private readonly api: ILarekApi;

	constructor(app: IAppState, api: ILarekApi) {
		super(app);
		this.api = api;
	}

	/**
	 * Изменение поля формы
	 */
	onFieldChange = (field: ContactsFormField, value: string) => {
		this.model.contactsValidator.setValue(field, value);
		this.model.notifyContactsChange();
	};

	/**
	 * Submit формы — отправка заказа
	 */
	onSubmit = async () => {
		const orderValidator = this.model.orderValidator;
		const contactsValidator = this.model.contactsValidator;

		if (!orderValidator.valid || !contactsValidator.valid) return;

		const orderData = orderValidator.getValues();
		const contactsData = contactsValidator.getValues();

		try {
			await this.api.createOrder({
				payment: orderData.payment,
				address: orderData.address,
				email: contactsData.email,
				phone: contactsData.phone,
				items: this.model.basket,
				total: this.model.getBasketTotal(),
			});

			// Открываем success — корзина ещё не очищена, total доступен
			this.model.openModal(AppStateModals.success);
		} catch (error) {
			// TODO: показать ошибку
			console.error('Order error:', error);
		}
	};

	/**
	 * Закрыть модалку
	 */
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
