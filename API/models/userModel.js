const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../config");
const bcrypt = require("bcrypt");
const Role = require("./roleModel");
const Etre = require("./etreModel");
const Address = require("./adressModel")

const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: (user) => {
        {
          user.password =
            user.password && user.password != ""
              ? bcrypt.hashSync(user.password, 10)
              : "";
        }
      },
    },
  }
);
User.belongsToMany(Role, { through: Etre });
Role.belongsToMany(User, { through: Etre });


User.hasMany(Address);
Address.belongsTo(User);

db.sync();

module.exports = User;
