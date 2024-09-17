import express from 'express';
import { userController, blogController, commentController } from '../controllers/controller';
import { validator } from '../auth/validation';
import authController from '../controllers/authController';
import token from '../middleware/token';

const router = express.Router();

// CREATE
router.post('/sign-up', validator.signUpRules(), userController.createUser);
router.post('/blogs', token.extract, token.verify, blogController.createBlog);

router.post(
  '/blogs/:id/comments',
  token.extract,
  token.verify,
  validator.addCommentRules(),
  commentController.addComment,
);
router.post(
  '/blogs/:id/comments/reply',
  token.extract,
  token.verify,
  validator.replyToCommentRules(),
  commentController.replyToComment,
);

// READ
router.get('/users', token.extract, token.verify, userController.getAllUsers);
router.get('/users/:id', token.extract, token.verify, userController.getUser);
router.get('/users/blogs/:id', token.extract, token.verify, blogController.getAllBlogsFromUser);
router.post('/blogs/:name', blogController.searchBlog);

router.get('/blogs', blogController.getAllBlogsWithUsers);
router.get('/blogs/:id', blogController.getBlog);
router.get('/blogs/:id/comments', blogController.getBlogComments);

// UPDATE
router.put('/blogs/:id', token.extract, token.verify, validator.blogRules(), blogController.updateBlog);
router.get('/blogs/:userId/:blogId', token.extract, token.verify, blogController.isAllowedToEdit);

// DELETE
router.delete('/blogs/:id', token.extract, token.verify, blogController.deleteBlog);

// LOGGING IN
router.post('/login', validator.loginRules(), authController.logIn);
router.get('/protected', authController.authenticateJwt, (req, res) => {
  res.json({
    message: 'You are logged in and can access the protected route!',
    user: req.user,
  });
});

router.get('/test', (req, res) => {
  return res.json([{ title: 'test' }, { title: 'test2' }]);
});

// catch all route
router.get('*', (req, res) => {
  res.status(404).send('Error, route not found');
});

export default router;
