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
 * При AppStateChanges.modal emit'ит:
 * 1. AppStateChanges.modal — для закрытия всех модалок
 * 2. Конкретный modal event (AppStateModals.product) — для открытия текущей
 *
 * @example
 * app.on(AppStateChanges.modal, () => {
 *   // Закрыть все модалки кроме current
 *   Object.entries(modal).forEach(([key, screen]) => {
 *     screen.render({ isActive: key === app.model.openedModal });
 *   });
 * });
 *
 * app.on(AppStateModals.product, () => {
 *   modal[AppStateModals.product].render({ ...product, isActive: true });
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
			onChange: this.onModelChange,
		});
	}

	/**
	 * Обработка изменений модели
	 */
	onModelChange = (changed: AppStateChanges): void => {
		if (changed === AppStateChanges.modal) {
			// 1. Emit AppStateChanges.modal — для закрытия всех
			this.emit(changed, {});

			// 2. Emit конкретный modal event — для открытия текущей
			this.emit(this.model.openedModal, {});
		} else {
			this.emit(changed, {});
		}
	}
}
