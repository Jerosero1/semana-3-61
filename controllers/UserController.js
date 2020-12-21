const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models');

const signin = async(req, res) => {
  try {
    const user = await models.user.findOne({where: {email: req.body.email}});
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({id: user.id, name: user.name, email: user.email}, 'key-super-secret', {expiresIn: 84600});
          res.status(200).send({
            auth: true,
            accessToken: token
          })
        } else {
          res.status(401).send({
            auth: false,
            accessToken: null,
            reason: "Invalid Password!"
          });          
        }
      } else {
        res.status(404).send('User Not Found.');
      }        
  } catch (error) {
    res.status(500).send({ error });
  }
};

const register = async(req, res, next) =>{
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.user.create(req.body);
    res.status(200).json(user);
  } catch (error) {

  }
};

const getUser = async(req, res, next) =>{
  try {
    const user = await models.user.findOne({where: {email: req.body.email}});
    if (user) {
      console.log(user);
    }
  } catch (error) {

  }
};

module.exports = {
  getUser,
  signin,
  register,
}
