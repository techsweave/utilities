import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import cors from '@middy/http-cors';

interface Options {
    credentials?: boolean | string
    headers?: string
    methods?: string
    origin?: string
    origins?: string[]
    exposeHeaders?: string
    maxAge?: number | string
    requestHeaders?: string
    requestMethods?: string
    cacheControl?: string
}

export const middyfy = (handler) => {
    const options: Options = {
        headers: '*'
    };
    return middy(handler).use(middyJsonBodyParser()).use(cors(options));
};
