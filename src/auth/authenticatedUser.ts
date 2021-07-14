import AWS from 'aws-sdk';
import { Email } from 'aws-sdk/clients/codecommit';

export class AuthenticatedUser {

    private _provider: AWS.CognitoIdentityServiceProvider;
    private _userId: string;
    private _email: Email;
    private _phoneNumber: string;
    private _name: string;
    private _familyName: string;
    private _birthDate: string;
    private _address: string;

    /**
     * @async
     *
     * @summary Factory constructor for AuthenticatedUser
     *
     * @param  {string} token Token of authorizedUser
     * @return {Promise<AuthenticatedUser>} New AuthenticatedUser object
     *
     * @throws Message of the failed request, if provided token does not belong to an Cognito user
     */
    static async fromToken(token: string): Promise<AuthenticatedUser> {
        const res = new AuthenticatedUser();
        const user = (await res._provider
            .getUser({
                AccessToken: token
            }).promise());

        res._userId = user.Username;
        res._email = user.UserAttributes.find(element => element.Name == 'email').Value;
        res._familyName = user.UserAttributes.find(element => element.Name == 'family_name').Value;
        res._name = user.UserAttributes.find(element => element.Name == 'name').Value;
        res._phoneNumber = user.UserAttributes.find(element => element.Name == 'phone_number').Value;
        res._birthDate = user.UserAttributes.find(element => element.Name == 'birthdate').Value;
        res._address = user.UserAttributes.find(element => element.Name == 'address').Value;

        return Promise.resolve(res);
    }

    private constructor() {
        this._provider = new AWS.CognitoIdentityServiceProvider({
            apiVersion: 'latest'
        });
    }

    /**
     * @async
     *
     * @summary Get the user Id
     * 
     * @return {Promise<string>} Cognito User Id (Username)
     */
    public async getUserId(): Promise<string> {
        return Promise.resolve(this._userId);
    }



    /**
     * @async
     *
     * @summary Get the user email
     * 
     * @return {Promise<string>} Cognito User Email
     */
    public async getEmail(): Promise<string> {
        return Promise.resolve(this._email);
    }

    /**
     * 
     * @summary Private method for setting attributes
     * 
     * @param name The attribute name to change
     * @param value The value to apply to the attribute
     * @param userPoolId Congito user pool id
     */
    private async setAttributes(name: string, value: string, userPoolId: string): Promise<void> {
        this._provider.adminUpdateUserAttributes({
            UserAttributes: [
                {
                    Name: name,
                    Value: value
                }
            ],
            UserPoolId: userPoolId,
            Username: this._userId
        });
    }

    /**
     * @async
     *
     * @summary Get the user name
     *
     * @return {Promise<string>} Cognito User name
     */
    public async getName(): Promise<string> {
        return Promise.resolve(this._name);
    }

    /**
     * 
     * @summary Method for setting user's name
     *
     * @param value The value to apply to the attribute
     * @param userPoolId Congito user pool id
     */
    public async setName(value: string, userPoolId: string): Promise<void> {
        this.setAttributes('name', value, userPoolId);
    }

    /**
     * @async
     *
     * @summary Get the user family name
     *
     * @return {Promise<string>} Cognito User family name
     */
    public async getFamilyName(): Promise<string> {
        return Promise.resolve(this._familyName);
    }

    /**
     * 
     * @summary Method for setting user's family name
     *
     * @param value The value to apply to the attribute
     * @param userPoolId Congito user pool id
     */
    public async setFamilyName(value: string, userPoolId: string): Promise<void> {
        this.setAttributes('family_name', value, userPoolId);
    }

    /**
     * @async
     *
     * @summary Get the user phone number
     *
     * @return {Promise<string>} Cognito User phone number
     */
    public async getPhoneNumber(): Promise<string> {
        return Promise.resolve(this._phoneNumber);
    }

    /**
         * 
         * @summary Method for setting user's telephone number
         *
         * @param value The value to apply to the attribute
         * @param userPoolId Congito user pool id
         */
    public async setPhoneNumber(value: string, userPoolId: string): Promise<void> {
        this.setAttributes('phone_number', value, userPoolId);
    }

    /**
     * @async
     *
     * @summary Get the user birthdate
     *
     * @return {Promise<string>} Cognito User birthdate
     */
    public async getBirthdate(): Promise<string> {
        return Promise.resolve(this._birthDate);
    }

    /**
         * 
         * @summary Method for setting user's birthdate
         *
         * @param value The value to apply to the attribute
         * @param userPoolId Congito user pool id
         */
    public async setBirthdate(value: string, userPoolId: string): Promise<void> {
        this.setAttributes('birthdate', value, userPoolId);
    }

    /**
    * @async
    *
    * @summary Get the user address
    * 
    * @return {Promise<string>} Cognito User address
    */
    public async getAddress(): Promise<string> {
        return Promise.resolve(this._address);
    }

    /**
         * 
         * @summary Method for setting user's address
         *
         * @param value The value to apply to the attribute
         * @param userPoolId Congito user pool id
         */
    public async setAddress(value: string, userPoolId: string): Promise<void> {
        this.setAttributes('address', value, userPoolId);
    }

    /**
     * @async
     *
     * @summary Check if the authenticated user is a vendor
     *
     * @param  {string} userPoolId Id of user pool
     * @return {Promise<boolean>} True id the user is a vendor, otherwise false
     *
     * @throws Message of the failed request, if there's no groups associated whit the Cognito user
     */
    public async isVendor(userPoolId: string): Promise<boolean> {
        const groupList = await this._provider.adminListGroupsForUser({
            Username: this._userId,
            UserPoolId: userPoolId
        }).promise();
        return Promise.resolve(groupList.Groups?.find(x => x.GroupName == 'Vendor') ? true : false);
    }
}