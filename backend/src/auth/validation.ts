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

  createBlogRules() {
    return [
      body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 50 })
        .withMessage('Title must be at most 50 characters long'),

      body('content')
        .trim()
        .notEmpty()
        .withMessage('Content is required')
        .isLength({ max: 50000 })
        .withMessage('Content must be at most 50000 characters long'),

      body('is_published')
        .isBoolean()
        .withMessage('Published must be a boolean value'),
    ];
  }

  loginRules() {
    return [
      body('name').trim()
        .notEmpty()
        .withMessage('Name is required'),
      body('password').trim()
        .notEmpty()
        .withMessage('Password is required'),
    ];
  }
}

export const validator = new Validator();
