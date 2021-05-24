import { APIGatewayProxyResult } from 'aws-lambda';
import { AWSError } from 'aws-sdk';
import { StatusCodes } from 'http-status-codes';
export declare class Response<T> {
    private _statusCode;
    private _data?;
    private _error?;
    private _lastEvaluatedKey?;
    static fromMultipleData<U>(data: U[], statusCode: StatusCodes, lastEvaluatedKey: Partial<U>): Response<U>;
    static fromData<U>(data: U, statusCode: StatusCodes): Response<U>;
    static fromError<U>(error: AWSError): Response<U>;
    hasData(): boolean;
    addPage(data: T[], lastEvaluatedKey: Partial<T>): void;
    toAPIGatewayProxyResult(): Promise<APIGatewayProxyResult>;
}
