import type { StandardSchemaV1 } from '@standard-schema/spec';
import {
	IFormValidator,
	FormState,
} from '@/types/components/common/formValidator';

export class FormValidator<T extends Record<string, unknown>>
	implements IFormValidator<T>
{
	private values: Partial<T>;
	private state: FormState<T>;
	private readonly initialValues: Partial<T>;

	constructor(
		private readonly schema: StandardSchemaV1<T>,
		initialValues: Partial<T>
	) {
		this.initialValues = { ...initialValues };
		this.values = { ...initialValues };
		this.state = this.createInitialState();
		this.validate();
	}

	private createInitialState(): FormState<T> {
		return {
			values: { ...this.values },
			errors: {},
			valid: false,
		};
	}

	setValue<K extends keyof T>(field: K, value: T[K]): void {
		this.values[field] = value;
		this.validate();
	}

	private validate(): void {
		const result = this.schema['~standard'].validate(this.values);

		if (result instanceof Promise) {
			throw new Error('FormValidator: async validation is not supported');
		}

		if (result.issues) {
			this.state = {
				values: { ...this.values },
				errors: this.extractErrors(result.issues),
				valid: false,
			};
		} else {
			this.state = {
				values: { ...this.values },
				errors: {},
				valid: true,
			};
		}
	}

	private extractErrors(
		issues: ReadonlyArray<StandardSchemaV1.Issue>
	): Partial<Record<keyof T, string>> {
		const errors: Partial<Record<keyof T, string>> = {};
		for (const issue of issues) {
			const field = issue.path?.[0] as keyof T | undefined;
			if (field && !errors[field]) {
				errors[field] = issue.message;
			}
		}
		return errors;
	}

	getState(): FormState<T> {
		return { ...this.state };
	}

	getValues(): Partial<T> {
		return { ...this.values };
	}

	getErrorsArray(): string[] {
		return Object.values(this.state.errors).filter(
			(error): error is string => typeof error === 'string'
		);
	}

	get valid(): boolean {
		return this.state.valid;
	}

	reset(): void {
		this.values = { ...this.initialValues };
		this.validate();
	}
}
