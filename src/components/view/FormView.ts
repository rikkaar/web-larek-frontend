import { View } from '@/components/base/View';
import { FormFieldConfig } from '@/types/components/view/formField';

/**
 * Базовые настройки для форм
 */
export interface FormViewSettings<K extends string> {
	/** Конфигурация полей */
	fields: FormFieldConfig<K>[];
	/** Селектор ошибки */
	errorSelector: string;
	/** Callback изменения поля */
	onFieldChange: (field: K, value: string) => void;
	/** Callback отправки формы */
	onSubmit: (event: SubmitEvent) => void;
}

/**
 * Базовые данные для форм
 */
export interface FormViewData {
	error: string;
}

/**
 * Абстрактный базовый класс для форм.
 * Инкапсулирует общую логику: навешивание обработчиков, setFieldValue.
 *
 * @template K — тип ключей полей формы (например, 'email' | 'phone')
 * @template D — тип данных для render
 * @template S — тип настроек
 */
export abstract class FormView<
	K extends string,
	D extends FormViewData,
	S extends FormViewSettings<K>
> extends View<D, S, HTMLFormElement> {
	/** Кэш input-элементов по имени поля */
	protected fieldInputs = new Map<K, HTMLInputElement>();

	protected init(): void {
		// Обработчик submit формы
		this.element.addEventListener('submit', this.handleSubmit);

		// Навешиваем слушатели на все поля из конфигурации
		for (const field of this.settings.fields) {
			const input = this.ensure<HTMLInputElement>(field.selector);
			this.fieldInputs.set(field.name, input);
			input.addEventListener('input', () => {
				this.settings.onFieldChange(field.name, input.value);
			});
		}
	}

	private handleSubmit = (event: SubmitEvent): void => {
		this.settings.onSubmit(event);
	};

	/**
	 * Установить значение input-поля
	 */
	setFieldValue(name: K, value: string): void {
		const input = this.fieldInputs.get(name);
		if (input && input.value !== value) {
			input.value = value;
		}
	}

	set error(value: string) {
		this.setValue(this.settings.errorSelector, value);
	}
}

