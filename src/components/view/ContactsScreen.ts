import { ModalScreen } from './ModalScreen';
import { FormView } from './FormView';
import {
	ContactsFormField,
	ContactsScreenSettings,
	ContactsScreenData,
	FormViewSettings,
	FormViewData,
} from '@/types/components/view/form';
import { settings } from '@/utils/constants';
import { cloneTemplate } from '@/utils/utils';

export { ContactsScreenSettings, ContactsScreenData };

/**
 * Конкретная реализация FormView для контактов
 */
class ContactsFormView extends FormView<
	ContactsFormField,
	FormViewData,
	FormViewSettings<ContactsFormField>
> {}

/**
 * Экран формы контактов (шаг 2).
 */
export class ContactsScreen extends ModalScreen<
	ContactsScreenData,
	ContactsScreenSettings
> {
	private formView: ContactsFormView;

	protected initContent(): HTMLElement {
		const formTemplate = cloneTemplate<HTMLFormElement>(settings.templates.contactsForm);

		this.formView = new ContactsFormView(formTemplate, {
			fields: [
				{ name: 'email', selector: settings.contactsForm.emailInput },
				{ name: 'phone', selector: settings.contactsForm.phoneInput },
			],
			submitButtonSelector: settings.form.submitButton,
			errorSelector: settings.form.errors,
			onFieldChange: (field, value) => this.settings.onFieldChange(field, value),
			onSubmit: () => this.settings.onSubmit(),
		});

		return this.formView.element;
	}

	set error(value: string | undefined) {
		this.formView.error = value;
	}

	set valid(value: boolean) {
		this.formView.button = {
			label: settings.text.pay,
			disabled: !value,
		};
	}

	setFieldValue(field: ContactsFormField, value: string | undefined): void {
		this.formView.setFieldValue(field, value);
	}
}
