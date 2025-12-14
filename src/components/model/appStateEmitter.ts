import { EventEmitter } from '@/components/base/events';
import { ILarekApi } from '@/types/components/model/larekApi';
import {
	AppStateChanges,
	AppStateConstructor,
	IAppState,
} from '@/types/components/model/appState';

/**
 * Обёртка над AppState с поддержкой событий.
 *
 * Наследует EventEmitter и содержит AppState.
 * При изменении модели эмитит события.
 *
 * @example
 * const app = new AppStateEmitter(api, AppState);
 *
 * // Подписка на изменения
 * app.on(AppStateChanges.basket, () => {
 *   console.log('Basket:', app.model.getBasketCount());
 * });
 *
 * // Изменение данных (модель сама уведомит)
 * app.model.addToBasket(productId);
 */
export class AppStateEmitter extends EventEmitter {
	public model: IAppState;

	constructor(api: ILarekApi, Model: AppStateConstructor) {
		super();

		this.model = new Model(api, {
			onChange: (changed: AppStateChanges) => this.emit(changed, {}),
		});
	}
}
