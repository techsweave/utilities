import {
    ConditionExpression,
    BinaryComparisonPredicate
} from '@aws/dynamodb-expressions';

interface ContainsType extends BinaryComparisonPredicate {
    type: 'Contains',
}

type ContainsExpression = ContainsType & {
    subject: string,
    object: string,
}

export type CustomConditionExpression = ConditionExpression | ContainsExpression;