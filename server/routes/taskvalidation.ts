
import { body } from 'express-validator';

const taskValidationRules = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isString()
        .withMessage('Title must be a string'),
    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string'),
    body('status')
        .notEmpty()
        .withMessage('Status is required')
        .isString()
        .withMessage('Status must be a string'),
    body('priority')
        .optional()
        .isString()
        .withMessage('Priority must be a string'),
    body('deadline')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Deadline must be a valid ISO 8601 date')
];

export default taskValidationRules;