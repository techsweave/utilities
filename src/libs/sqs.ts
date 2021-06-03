import type { SQSRecord, Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

type ValidatedSQSRecord<S> = Omit<SQSRecord, 'body'> & { body: FromSchema<S> }
type ValidatedSQSEvent<S> = { Records: ValidatedSQSRecord<S>[] }

export type ValidatedEventSQSEvent<S> = Handler<ValidatedSQSEvent<S>, void>