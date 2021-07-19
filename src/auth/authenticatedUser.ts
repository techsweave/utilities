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
     * @param token The accessToken of the user
     * @param name The value of name attribute to change
     * @param familyName The value of familyName attribute to change
     * @param phoneNumber The value of phoneNumber attribute to change
     * @param birthdate The value of birthdate attribute to change
     * @param address The value of address attribute to change
     */
    public async setAttributes(token: string, name: string, familyName: string, phoneNumber: string, birthdate: string, address: string): Promise<void> {
        await this._provider.updateUserAttributes({
            AccessToken: token,
            UserAttributes: [
                {
                    Name: 'name',
                    Value: name === '' ? name : this._name
                },
                {
                    Name: 'family_name',
                    Value: familyName === '' ? familyName : this._familyName
                },
                {
                    Name: 'phone_number',
                    Value: phoneNumber === '' ? phoneNumber : this._phoneNumber
                },
                {
                    Name: 'birthdate',
                    Value: birthdate === '' ? birthdate : this._birthDate
                },
                {
                    Name: 'address',
                    Value: address === '' ? address : this._address
                }
            ],
        }).promise();
    }

    /**
     * 
     * @summary async function to change the user's password
     * 
     * @param token accessToken of the user
     * @param oldPassword password to change
     * @param newPassword password to apply
     */
    public async changePassword(token: string, oldPassword: string, newPassword: string): Promise<void> {
        await this._provider.changePassword({
            AccessToken: token,
            PreviousPassword: oldPassword,
            ProposedPassword: newPassword
        }).promise();
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