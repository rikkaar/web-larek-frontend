import { EventHandler, EventsMap } from '@/types/components/base/events';

export class EventEmitter {
	protected events: EventsMap;

	constructor() {
		this.events = new Map();
	}

	on(eventName: string, handler: EventHandler): void {
		if (!this.events.has(eventName)) {
			this.events.set(eventName, new Set());
		}
		this.events.get(eventName).add(handler);
	}

	off(eventName: string, handler: EventHandler): void {
		if (this.events.has(eventName)) {
			this.events.get(eventName).delete(handler);
		}
	}

	emit(eventName: string, data: object): void {
		if (this.events.has(eventName)) {
			this.events.get(eventName).forEach((handler) => handler(data));
		}
	}

	reset(): void {
		this.events.clear();
	}

	bindEmitter(events: EventsMap): void {
		this.events = events;
	}
}
