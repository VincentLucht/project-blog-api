import { body } from 'express-validator';
// prettier-ignore

class Validator {
  createUserRules() {
    return [
      body('name').trim()
        .isLength({ min: 1 })
        .withMessage('Name must at least be 1 character long.')
        .isLength({ max: 25 })
        .withMessage('Name must not be longer than 25 characters.'),

      body('password').trim()
        .isLength({ min: 1 })
        .withMessage('Password must be at least 1 character long.')
        .isLength({ max: 255 })
        .withMessage('Password must not be longer than 255 characters.'),

      body('role').trim()
        .notEmpty()
        .withMessage('Role is required')
        .isIn(['BASIC', 'AUTHOR'])
        .withMessage('Role must either be BASIC or AUTHOR'),
    ];
  }
}

export const validator = new Validator();
