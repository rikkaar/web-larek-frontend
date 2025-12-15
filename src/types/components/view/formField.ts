export interface FormFieldConfig<K extends string> {
	name: K;

	selector: string;
}

export type FormFieldsData<K extends string> = Record<K, string>;

export interface FormFieldsSettings<K extends string> {
	fields: FormFieldConfig<K>[];

	onChange: (field: K, value: string) => void;
}
