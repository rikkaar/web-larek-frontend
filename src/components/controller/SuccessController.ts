import { Controller } from './controller';
import { IAppState, AppStateModals } from '@/types/components/model/appState';
import { SuccessScreenSettings } from '@/components/view/SuccessScreen';

export class SuccessController
	extends Controller<IAppState>
	implements SuccessScreenSettings
{
	onClose = () => {
		this.model.clearBasket();
		this.model.resetValidators();
		this.model.openModal(AppStateModals.none);
	};
}
