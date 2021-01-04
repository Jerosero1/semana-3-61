const jwt = require('jsonwebtoken');
const models = require('../models');

async function checkToken(accessToken) {
  let __id = null;
  try {
    const { id } = await jwt.decode(accessToken);
    __id = id;
  } catch (e) {
    return false;
  }
  const user = await models.user.findOne({ where: { id: __id, estado: 1 } });
  if (user) {
    const token = jwt.sign({ id: __id }, 'secretKeyToGenerateToken', { expiresIn: '1d' });
    return { token, rol: user.rol };
  }
  return false;
}

// generar el token
const encode = async (_id, rol = 'Administrador') => {
  try {
    const token = jwt.sign({ id: _id, rol }, 'secretKeyToGenerateToken', { expiresIn: '1d' });
    return token;
  } catch (e) {
    console.error(e);
    return false;
  }
};

// permite decodificar el token
const decode = async (token) => {
  try {
    const { id } = await jwt.verify(token, 'secretKeyToGenerateToken');
    const user = await models.user.findOne({ where: { id } });
    if (user) {
      return user;
    }
    return false;
  } catch (e) {
    const newToken = await checkToken(token);
    return newToken;
  }
};

module.exports = {
  encode,
  decode,
};
