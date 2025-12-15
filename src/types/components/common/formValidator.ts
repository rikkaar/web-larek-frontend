import type { StandardSchemaV1 } from '@standard-schema/spec';

export type { StandardSchemaV1 };

export interface FormState<T> {
	values: Partial<T>;
	errors: Partial<Record<keyof T, string>>;
	valid: boolean;
}

export interface IFormValidator<T> {
	setValue<K extends keyof T>(field: K, value: T[K]): void;
	getState(): FormState<T>;
	getValues(): Partial<T>;
	getErrorsArray(): string[];
	readonly valid: boolean;
	reset(): void;
}
