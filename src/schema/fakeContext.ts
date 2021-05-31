export const fakeContext = {
    awsRequestId: '',
    callbackWaitsForEmptyEventLoop: false,
    functionName: 'getTag',
    functionVersion: 'latest',
    invokedFunctionArn: 'boh',
    logGroupName: 'tags',
    logStreamName: 'tags',
    memoryLimitInMB: '1024',
    getRemainingTimeInMillis: function () {
        return 10000;
    },
    done: function () {
        return null;
    },
    fail: function () {
        return null;
    },
    succeed: function () {
        return null;
    }
};