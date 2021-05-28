export interface IMultipleDataBody<T> {
    data: T[],
    count: number,
    lastEvaluatedKey?: Partial<T>
}
