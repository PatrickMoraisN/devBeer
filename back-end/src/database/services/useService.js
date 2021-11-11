const { User } = require('../models');
const { HTTP_CREATED, HTTP_CONFLICT, HTTP_OK_STATUS } = require('../../status');
const { createToken } = require('../../validations/auth/validateJWT');

async function readByEmailService(email) {
  const user = await User.findOne({ where: { email } });
  return user;
};

async function createUserService({ name, email, password }) {
  const isUserResgistered = await readByEmailService(email);
  const role = "customer";

  if (isUserResgistered) {
    return { isRegistered: true, code: HTTP_CONFLICT, error: "User already registered" };
  };

  await User.create({ name, email, password, role });

  const userLogin = { name, email, role };
  const token = await createToken(userLogin);
  const data = { name, email, role, token };

  return { data, code: HTTP_CREATED };
};

async function loginService({ password, email }) {
  const isUserResgistered = await readByEmailService(email);

  if (!isUserResgistered) {
    return { notFound: true, code: HTTP_CONFLICT, error: "User dont exists" };
  };

  if (password !== isUserResgistered.password) {
    return { invalidPassword: true, code: HTTP_CONFLICT, error: "Invalid data" }
  };

  const { name, role } = await readByEmailService(email);
  const userLogin = { name, role, email };
  const token = await createToken(userLogin);
  const data = { name, email, role, token };

  return { data, code: HTTP_OK_STATUS };
};

module.exports = {
  createUserService,
  loginService,
};