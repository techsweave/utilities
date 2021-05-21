export interface MultipleDataBody<T> {
    data: T[],
    count: number,
    lastEvaluatedKey?: Partial<T>
}
