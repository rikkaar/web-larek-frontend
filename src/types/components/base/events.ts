export type EventHandler = (data: object) => void;

export type EventsMap = Map<string, Set<EventHandler>>;
