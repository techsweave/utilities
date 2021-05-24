export interface Log {
    id: string;
    userId: string;
    operation: string;
    table: string;
    recordId?: string | Partial<any>;
}
