const bcrypt = require('bcryptjs');
const models = require('../models');
const token = require('../services/token');

const signin = async (req, res, next) => {
  try {
    const user = await models.user.findOne({ where: { email: req.body.email } });
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = await token.encode(user.id, user.rol);
        res.status(200).json({ user: { name: user.name, email: user.email }, accessToken });
      } else {
        res.status(401).send({ auth: false, accessToken: null, reason: 'Password Incorrecto' });
      }
    } else {
      res.status(404).send({ message: 'No existe el usuario' });
    }
  } catch (e) {
    res.status(500).send({ message: 'Ocurrió un error' });
    next(e);
  }
};

const register = async (req, res, next) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await models.user.create(req.body);
    res.status(200).json({ name: user.name, email: user.email });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await models.user.findOne({ where: { email: req.body.email } });
    if (user) {
      res.send({ name: user.name, email: user.email });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser,
  signin,
  register,
};
