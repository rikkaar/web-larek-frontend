import { EventEmitter } from '@/components/base/events';
import { ILarekApi } from '@/types/components/model/larekApi';
import {
	AppStateChanges,
	AppStateConstructor,
	AppStateSettings,
	IAppState,
} from '@/types/components/model/appState';

/**
 * Настройки для AppStateEmitter (без onChange — он добавляется автоматически)
 */
export type AppStateEmitterSettings = Omit<AppStateSettings, 'onChange'>;

/**
 * Обёртка над AppState с поддержкой событий.
 *
 * Наследует EventEmitter и содержит AppState.
 * При изменении модели эмитит события.
 *
 * @example
 * const orderValidator = new FormValidator(orderFormSchema, orderFormInitialValues);
 * const contactsValidator = new FormValidator(contactsFormSchema, contactsFormInitialValues);
 *
 * const app = new AppStateEmitter(api, AppState, {
 *   orderValidator,
 *   contactsValidator,
 * });
 *
 * app.on(AppStateChanges.basket, () => {
 *   console.log('Basket:', app.model.getBasketCount());
 * });
 */
export class AppStateEmitter extends EventEmitter {
	public model: IAppState;

	constructor(
		api: ILarekApi,
		Model: AppStateConstructor,
		settings: AppStateEmitterSettings
	) {
		super();

		this.model = new Model(api, {
			...settings,
			onChange: (changed: AppStateChanges) => this.emit(changed, {}),
		});
	}
}
