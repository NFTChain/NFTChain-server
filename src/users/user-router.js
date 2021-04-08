require('dotenv');
const router = require('express').Router();

const userController = require('./user-controllers');
const checkAuth = require('../utils/check-auth');
const userMiddleware = require('./user-helpers');

const {
  validateId,
  validateRegister,
  validateLogin,
  validatePasswordUpdate,
  validateEmail,
  validateUsername,
  validatePassword,
} = userMiddleware;

router.get('/', checkAuth, userController.getUsers);
router.get('/:id', checkAuth, userController.getUserByID);
router.post(
  '/register',
  [validateRegister, validateUsername, validateEmail],
  userController.register
);
router.post('/login', [validateLogin, validatePassword], userController.login);
router.delete('/:id', checkAuth, validateId, userController.delete);
router.put('/:id', validatePasswordUpdate, userController.put);

module.exports = router;
