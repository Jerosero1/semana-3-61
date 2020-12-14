const router = require('express').Router();
const { User } = require('../../models');
const userController = require('../../controllers/UserController.js');
const bcrypt = require('bcryptjs');
// const { ROWLOCK } = require('sequelize/types/lib/table-hints');


router.get('/', async(req,res)=>{
    // const user = await User.findAll();
    const user = await User.user.findAll();
    res.status(200).json(user);
})

//api/user/register
router.post('/register', async(req,res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    // const user = await User.create(req.body);
    const user = await User.user.create(req.body);
    res.status(200).json(user);
});

// router.get('/', userController.listar);
// router.post('/register', userController.register);
router.post('/signin', userController.signin);

// router.post('/login', userCOntroller.login);
// router.post('/register', userController.register)

module.exports = router
