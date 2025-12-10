export type ApiListResponse<T> = {
    total: number,
    items: T[]
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
