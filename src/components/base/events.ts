import { EventHandler, EventsMap } from '@/types/components/base/events';

/**
 * Брокер событий.
 * Классическая реализация паттерна Observer/PubSub.
 *
 * @example
 * const events = new EventEmitter();
 *
 * events.on('product:select', (data) => {
 *   console.log(data);
 * });
 *
 * events.emit('product:select', { id: '123' });
 */
export class EventEmitter {
	protected events: EventsMap;

	constructor() {
		this.events = new Map();
	}

	/**
	 * Подписаться на событие
	 */
	on(eventName: string, handler: EventHandler): void {
		if (!this.events.has(eventName)) {
			this.events.set(eventName, new Set());
		}
		this.events.get(eventName).add(handler);
	}

	/**
	 * Отписаться от события
	 */
	off(eventName: string, handler: EventHandler): void {
		if (this.events.has(eventName)) {
			this.events.get(eventName).delete(handler);
		}
	}

	/**
	 * Отправить событие
	 */
	emit(eventName: string, data: object): void {
		if (this.events.has(eventName)) {
			this.events.get(eventName).forEach((handler) => handler(data));
		}
	}

	/**
	 * Сбросить все обработчики
	 */
	reset(): void {
		this.events.clear();
	}

	/**
	 * Привязать внешнюю карту событий
	 */
	bindEmitter(events: EventsMap): void {
		this.events = events;
	}
}
