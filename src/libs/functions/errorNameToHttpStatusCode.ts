import { AWSError } from 'aws-sdk';
import { StatusCodes } from 'http-status-codes';
/*
 * This function is intended to convert a error type name to the corresponding Http Status Code
*/
export const errorNameToHttpStatusCode = async (error: AWSError): Promise<number> => {
    let code: number;
    switch (error.name) {
    case 'ItemNotFoundException':
        code = StatusCodes.NOT_FOUND;
        break;
    case 'UserNotAllowed':
        code = StatusCodes.FORBIDDEN;
        break;

    default:
        code = StatusCodes.INTERNAL_SERVER_ERROR;
        break;
    }
    return Promise.resolve(code);
};