"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectToConditionExpression = void 0;
const objectToConditionExpression = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let s;
    const childTasks = [];
    if (data == null)
        return null;
    switch (data.type) {
        case 'Equals':
            s = {
                type: 'Equals',
                object: data.object,
                subject: data.subject
            };
            break;
        case 'NotEquals':
            s = {
                type: 'NotEquals',
                object: data.object,
                subject: data.subject
            };
            break;
        case 'LessThan':
            s = {
                type: 'LessThan',
                object: data.object,
                subject: data.subject
            };
            break;
        case 'LessThanOrEqualTo':
            s = {
                type: 'LessThanOrEqualTo',
                object: data.object,
                subject: data.subject
            };
            break;
        case 'GreaterThan':
            s = {
                type: 'GreaterThan',
                object: data.object,
                subject: data.subject
            };
            break;
        case 'GreaterThanOrEqualTo':
            s = {
                type: 'GreaterThanOrEqualTo',
                object: data.object,
                subject: data.subject
            };
            break;
        case 'Between':
            s = {
                type: 'Between',
                lowerBound: data.lowerBound,
                upperBound: data.upperBound,
                subject: data.subject
            };
            break;
        case 'Membership':
            s = {
                type: 'Membership',
                subject: data.subject,
                values: data.values
            };
            break;
        case 'Not':
            s = {
                type: 'Not',
                condition: yield exports.objectToConditionExpression(data.condition)
            };
            break;
        case 'And':
            for (let i = 0; i < data.conditions.length; i++) {
                childTasks.push(exports.objectToConditionExpression(data.conditions[i]));
            }
            s = {
                type: 'And',
                conditions: yield Promise.all(childTasks)
            };
            break;
        case 'Or':
            for (let i = 0; i < data.conditions.length; i++) {
                childTasks.push(exports.objectToConditionExpression(data.conditions[i]));
            }
            s = {
                type: 'Or',
                conditions: yield Promise.all(childTasks)
            };
            break;
        default:
            throw new Error('Syntax Error!');
            break;
    }
    return s;
});
exports.objectToConditionExpression = objectToConditionExpression;
//# sourceMappingURL=objectToConditionExpression.js.map