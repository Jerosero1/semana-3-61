/** Express router providing user related routes
 * @module routes/api/users
 * @requires express
 */

const router = require('express').Router();
const models = require('../../models');
const UserController = require('../../controllers/UserController');
const bcrypt = require('bcryptjs');

/**
 * Route serving user data.
 * @name get/user
 * @function
 * @memberof module:routes/users~getUser
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - find user.
 */
router.get('/myUser', UserController.getUser)

/**
 * Route for register new user.
 * @name post/register
 * @function
 * @memberof module:routes/users~registerUser
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Create user.
 */
router.post('/register', UserController.register);

/**
 * Route serving login.
 * @name post/register
 * @function
 * @memberof module:routes/users~registerUser
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Authenticate user.
 */
router.post('/signin', UserController.signin);

module.exports = router
