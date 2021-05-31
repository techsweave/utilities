import * as AWS from 'aws-sdk';

export class TestUser {
    private _provider: AWS.CognitoIdentityServiceProvider;
    private _authResult: AWS.CognitoIdentityServiceProvider.AuthenticationResultType;

    public constructor() {
        this._provider = new AWS.CognitoIdentityServiceProvider({
            apiVersion: 'latest'
        });
    }

    /**
     * @async
     *
     * @summary Factory constructor for TestUser
     *
     * @param  {boolean} isVendor chose if create a vendor testUser or a customer one
     * @param {string} userPoolId id of the user pool  
     * @return {Promise<TestUser>} New TestUser object
     */
    static async fromRole(isVendor: boolean, userPoolId: string): Promise<TestUser> {
        const testUser = new TestUser();

        const username: string = isVendor ? 'testVendor' : 'testCustomer';
        const params: AWS.CognitoIdentityServiceProvider.AdminInitiateAuthRequest = {
            UserPoolId: userPoolId,
            AuthFlow: 'ADMIN_NO_SRP_AUTH',
            ClientId: '7v09dlda7r5pjnjciul7g8jrah',
            AuthParameters: {
                'USERNAME': username,
                'PASSWORD': 'Password48!'
            },
        };
        testUser._authResult = await (await testUser._provider.adminInitiateAuth(params).promise()).AuthenticationResult;

        return testUser;
    }

    /**
     * @async
     *
     * @summary Get the access token of the user
     *
     * @return {Promise<string>} String of the access token
     */
    public async getAccessToken(): Promise<string> {
        return Promise.resolve(this._authResult.AccessToken);
    }


}