/**
 * @summary Represent a record in usersStripeSessions table
 */
export interface IUserStripeSession {
    id: string;
    userId: string;
    stripeSessionId: string;
}