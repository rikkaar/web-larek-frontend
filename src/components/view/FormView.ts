import { View } from '@/components/base/View';
import { ButtonView } from './ButtonView';
import { FormViewSettings, FormViewData } from '@/types/components/view/form';
import { ButtonData } from '@/types/components/view/button';
import { ensureElement } from '@/utils/utils';

export { FormViewSettings, FormViewData };

/**
 * Базовый класс для форм.
 *
 * Управляет:
 * - Input-полями (слушатели input)
 * - Кнопкой submit (ButtonView с onClick)
 * - Ошибкой
 */
export abstract class FormView<
	K extends string,
	D extends FormViewData,
	S extends FormViewSettings<K>
> extends View<D, S, HTMLFormElement> {
	protected fieldInputs: Map<K, HTMLInputElement>;
	protected submitButton: ButtonView;

	protected init(): void {
		this.fieldInputs = new Map();
		// Слушатели на input-поля
		for (const field of this.settings.fields) {
			const input = this.ensure<HTMLInputElement>(field.selector);
			this.fieldInputs.set(field.name, input);
			input.addEventListener('input', () => {
				this.settings.onFieldChange(field.name, input.value);
			});
		}

		// Кнопка submit с явным onClick
		this.submitButton = new ButtonView(
			ensureElement<HTMLButtonElement>(
				this.settings.submitButtonSelector,
				this.element
			),
			{
				onClick: ({ event }) => {
					event.preventDefault();
					this.settings.onSubmit();
				},
			}
		);
	}

	setFieldValue(name: K, value: string | undefined): void {
		const input = this.fieldInputs.get(name);
		if (input && input.value !== (value ?? '')) {
			input.value = value ?? '';
		}
	}

	set error(value: string | undefined) {
		this.setValue(this.settings.errorSelector, value ?? '');
	}

	set button(value: ButtonData) {
		this.submitButton.render(value);
	}
}
