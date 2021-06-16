import { APIGatewayProxyResult } from 'aws-lambda';
import { AWSError } from 'aws-sdk';
import { errorNameToHttpStatusCode } from '../libs/functions/errorNameToHttpStatusCode';
import { StatusCodes } from 'http-status-codes';


export class Response<T> {

    private _statusCode: number;
    private _data?: T[] = []; // This is an array, in order to use scan and get whit the same response class
    private _error?: AWSError;
    private _lastEvaluatedKey?: Partial<T>;

    public static async fromMultipleData<U>(data: U[], statusCode: StatusCodes, lastEvaluatedKey: Partial<U>): Promise<Response<U>> {
        if (statusCode < 200 || statusCode >= 300) {
            throw new Error('If a response has data, the status code must be between 200 and 299');
        }
        const res = new Response<U>();
        res._data = data;
        res._statusCode = statusCode;
        res._lastEvaluatedKey = lastEvaluatedKey;
        return Promise.resolve(res);
    }

    public static async fromData<U>(data: U, statusCode: StatusCodes): Promise<Response<U>> {
        if (statusCode < 200 || statusCode >= 300) {
            throw new Error('If a response has data, the status code must be between 200 and 299');
        }
        const res = new Response<U>();
        res._data[0] = data;
        res._statusCode = statusCode;
        return Promise.resolve(res);
    }

    public static async fromError<U>(error: AWSError): Promise<Response<U>> {
        const res = new Response<U>();
        res._error = error;
        return Promise.resolve(res);
    }

    public async hasData(): Promise<boolean> {
        return Promise.resolve(this._data?.length != 0);
    }

    public async addPage(data: T[], lastEvaluatedKey: Partial<T>): Promise<void> {
        if (this.hasData()) {
            this._data = this._data.concat(data);
            this._lastEvaluatedKey = lastEvaluatedKey;
        }
    }

    /*
     * This function is intended to convert a Object of Response<T> to an APIGatewayProxyResult
     * in order to return the correct type in a Lamda function header
    */
    public async toAPIGatewayProxyResult(): Promise<APIGatewayProxyResult> {
        const response: APIGatewayProxyResult = {
            statusCode: this._statusCode,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: null
        };

        if (this._error != null) {
            this._data = undefined;

            // resolve the http status code
            this._statusCode = this._error?.statusCode;
            if (this._statusCode == null) {
                this._statusCode = await errorNameToHttpStatusCode(this._error);
            }

            response.statusCode = this._statusCode;
            response.body = JSON.stringify({
                error: {
                    name: this._error?.name,
                    message: this._error?.message
                }
            });
        }
        else if (this._data?.length == 1) {
            response.body = JSON.stringify({
                data: this._data[0],
                count: 1,
                lastEvaluatedKey: this._lastEvaluatedKey
            });
        }
        else {
            response.body = JSON.stringify({
                data: this._data,
                count: this._data?.length,
                lastEvaluatedKey: this._lastEvaluatedKey
            });
        }
        return Promise.resolve(response);
    }
}