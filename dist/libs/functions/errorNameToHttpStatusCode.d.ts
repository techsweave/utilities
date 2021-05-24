import { AWSError } from 'aws-sdk';
export declare const errorNameToHttpStatusCode: (error: AWSError) => Promise<number>;
