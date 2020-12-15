/** Express router providing user related routes
 * @module routes/api/users
 * @requires express
 */

const router = require('express').Router();
const { User } = require('../../models');
const userController = require('../../controllers/UserController');
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
router.get('/', async(req,res)=>{
    const user = await User.user.findAll();
    res.status(200).json(user);
})

/**
 * Route for register new user.
 * @name post/register
 * @function
 * @memberof module:routes/users~registerUser
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Create user.
 */
router.post('/register', async(req,res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.user.create(req.body);
    res.status(200).json(user);
});

/**
 * Route serving login.
 * @name post/register
 * @function
 * @memberof module:routes/users~registerUser
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Authenticate user.
 */
router.post('/signin', userController.signin);

module.exports = router
