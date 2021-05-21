
/**
 * @summary Rappresent a record in logs table
 */
export interface Log {
    id: string;
    userId: string;
    operation: string;
    table: string;
    recordId?: string | Partial<any>; // string or Partial<...>
}