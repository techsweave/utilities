export declare class AuthenticatedUser {
    private _provider;
    private _userId;
    static fromToken(token: string): Promise<AuthenticatedUser>;
    private constructor();
    getUserId(): Promise<string>;
    isVendor(userPoolId: string): Promise<boolean>;
}
