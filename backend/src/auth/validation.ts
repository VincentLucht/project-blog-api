import { body } from 'express-validator';
// prettier-ignore

class Validator {
  signUpRules() {
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

      body('confirm_password').trim()
        .custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Confirm password must match the password.');
          }
          return true;
        }),

      body('role').trim()
        .notEmpty()
        .withMessage('Role is required')
        .isIn(['BASIC', 'AUTHOR'])
        .withMessage('Role must either be BASIC or AUTHOR'),
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

  blogRules() {
    return [
      body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 100 })
        .withMessage('Title must be at most 100 characters long'),

      body('summary')
        .trim()
        .optional(),

      // ? not necessary? state holds the is_published value
      body('is_published')
        .isBoolean()
        .withMessage('Published must be Yes or No'),

      body('content')
        .trim()
        .custom((rawArray) => {
          const array = JSON.parse(rawArray);
          if (!Array.isArray(array)) {
            throw new Error('Are you sure you want to publish an empty Blog?');
          }
          return true;
        }),
    ];
  }

  addCommentRules() {
    return [
      body('text').trim()
        .notEmpty()
        .withMessage('Your comment should not be empty'),
    ];
  }

  replyToCommentRules() {
    return [
      body('text').trim()
        .notEmpty()
        .withMessage('Your reply should at least be 1 character long'),

      body('parent_comment_id').trim()
        .notEmpty()
        .withMessage('Replying to a comment requires the id of the parent id'),

      body('replied_to_name').trim()
        .notEmpty()
        .withMessage('You need to specify the name of the commenter you reply to'),
    ];
  }
}

export const validator = new Validator();
