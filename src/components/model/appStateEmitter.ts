import { EventEmitter } from '@/components/base/events';
import { ILarekApi } from '@/types/components/model/larekApi';
import {
	AppStateChanges,
	AppStateConstructor,
	AppStateSettings,
	IAppState,
} from '@/types/components/model/appState';

export type AppStateEmitterSettings = Omit<AppStateSettings, 'onChange'>;

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

	onModelChange = (changed: AppStateChanges): void => {
		if (changed === AppStateChanges.modal) {
			this.emit(changed, {});
			this.emit(this.model.openedModal, {});
		} else {
			this.emit(changed, {});
		}
	};
}
