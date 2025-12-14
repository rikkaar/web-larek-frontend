import { View } from './View';

/**
 * Базовый класс Screen.
 *
 * Screen — это View верхнего уровня, который:
 * - Получает Controller как settings
 * - Сам создаёт вложенные View в init()
 * - Не требует element в конструкторе
 */
export abstract class Screen<T, S extends object> extends View<T, S> {
	constructor(settings: S) {
		super(null, settings);
	}
}
