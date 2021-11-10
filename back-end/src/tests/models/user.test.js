const { expect } = require('chai');

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const UserModel = require('../../database/models/User');

describe('O model de User', () => {
  const User = UserModel(sequelize, dataTypes);
  const user = new User();

  describe('possui o nome "User"', () => {
    checkModelName(User)('User');
  });

  describe('possui as propriedades "name", "email", "password", "role"', () => {
    ['name', 'email', 'password', 'role'].forEach(checkPropertyExists(user));
  });

  describe('se possui associações', () => {
    const Sale = 'Sale';

    before(() => {
      User.associate(Sale);
    });

    it('possui "hasMany" com o model Sale', () => {
      expect(User.hasMany).to.have.been.calledWith(Sale);
    });
  });
});
