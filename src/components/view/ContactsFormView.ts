import { FormView, FormViewSettings, FormViewData } from './FormView';
import { ContactsFormField } from '@/types/components/view/form';
import { ButtonData } from '@/types/components/view/button';
import { IView } from '@/types/components/base/view';

/**
 * Данные для формы контактов
 */
export interface ContactsFormData extends FormViewData {
	button: ButtonData;
}

/**
 * Настройки для формы контактов
 */
export interface ContactsFormSettings extends FormViewSettings<ContactsFormField> {
	buttonView: IView<ButtonData>;
}

/**
 * View для формы контактов (шаг 2).
 * Отображает: email, phone, кнопку, ошибку.
 *
 * @example
 * const view = new ContactsFormView(cloneTemplate('#contacts'), {
 *   fields: [
 *     { name: 'email', selector: 'input[name="email"]' },
 *     { name: 'phone', selector: 'input[name="phone"]' },
 *   ],
 *   errorSelector: '.form__errors',
 *   buttonView: submitButtonView,
 *   onFieldChange: (field, value) => controller.setField(field, value),
 *   onSubmit: (event) => { event.preventDefault(); controller.submit(); },
 * });
 */
export class ContactsFormView extends FormView<
	ContactsFormField,
	ContactsFormData,
	ContactsFormSettings
> {
	set button(value: ButtonData) {
		this.settings.buttonView.render(value);
	}
}
