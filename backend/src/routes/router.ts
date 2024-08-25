import express from 'express';
import { userController, blogController } from '../controllers/controller';
import { validator } from '../auth/validation';
import authController from '../controllers/authController';
import token from '../middleware/token';

const router = express.Router();

// CREATE
router.post('/users', validator.createUserRules(), userController.createUser);
router.post('/blogs/:id', blogController.createBlog);

// READ
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUser);

router.get('/blogs', token.extract, token.verify, blogController.getAllBlogs);
router.get('/blogs/:id', blogController.getBlogWithComments);

// UPDATE

// DELETE

// LOGGING IN
router.post('/login', authController.logIn);

// catch all route
router.get('*', (req, res) => {
  res.status(404).send('Error, route not found');
});

export default router;
