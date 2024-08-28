import express from 'express';
import { userController, blogController } from '../controllers/controller';
import { validator } from '../auth/validation';
import authController from '../controllers/authController';
import token from '../middleware/token';

const router = express.Router();

// CREATE
router.post('/sign-up', validator.signUpRules(), userController.createUser);

router.post('/blogs', token.extract, token.verify, validator.blogRules(), blogController.createBlog);

// READ
router.get('/users', token.extract, token.verify, userController.getAllUsers);
router.get('/users/:id', token.extract, token.verify, userController.getUser);

router.get('/blogs', token.extract, token.verify, blogController.getAllBlogs);
router.get('/blogs/:id', blogController.getBlogWithComments);

// UPDATE
// TODO: update blogs => for other front end
router.put('/blogs/:id', token.extract, token.verify, validator.blogRules(), blogController.updateBlog);

// TODO update comments??

// DELETE
// TODO: delete blogs => for other front end
// TODO delete comments

// LOGGING IN
router.post('/login', validator.loginRules(), authController.logIn);
router.get('/protected', authController.authenticateJwt, (req, res) => {
  res.json({
    message: 'You are logged in and can access the protected route!',
    user: req.user,
  });
});

// catch all route
router.get('*', (req, res) => {
  res.status(404).send('Error, route not found');
});

export default router;
