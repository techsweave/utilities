/**
 * @summary Rappresent a record in usersStripeSessions table
 */
export interface UserStripeSession {
    id: string;
    userId: string;
    stripeSessionId: string;
}