/**
 * Типы для EventEmitter
 */

/** Обработчик события */
export type EventHandler = (data: object) => void;

/** Карта событий: имя события → набор обработчиков */
export type EventsMap = Map<string, Set<EventHandler>>;
