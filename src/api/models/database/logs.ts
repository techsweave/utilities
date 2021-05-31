
/**
 * @summary Represent a record in logs table
 */
export interface ILog {
    id: string;
    userId: string;
    operation: string;
    table: string;
    recordId?: string; // string or Partial<...>
}