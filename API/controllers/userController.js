const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const Role = require("../models/roleModel");
module.exports = {
  get: (req, res) => {
    const sU = true;
    res.render("register", { sU });
  },

  post: async (req, res) => {
    const password = req.body.password;
    const conPassword = req.body.confPassword;
    if (password === "") {
      const sU = true;
      const error = "Un mot de passe est recquis";
      res.render("register", { error, sU });
    } else {
      if (password !== conPassword) {
        const error = "La confirmation du mot de passe n'est pas correct";
        res.render("register", { error, sU });
      } else {
        const user = await User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          phone: req.body.phone,
        });
        const role = await Role.findOne({ where: { name: "user" } });
        user.addRole(role);
        res.render("form_address", {user});
      }
    }
  },
  getSignIn: async (req, res) => {
    const iD = true;
    res.render("login", { iD });
  },
  postSignIn: async (req, res) => {
    //chercher l'utilisateur qui cherche à se connecter
    const user = await User.findOne({
      where: { email: req.body.email },
      raw: true,
    });
    if (!user) {
      res.redirect("back");
    } else {
      bcrypt.compare(req.body.password, user.password, (err, same) => {
        if (!same) {
          res.redirect("back");
        } else {
          req.session.userPk = user.id;
          req.session.firstName = user.firstName;
          res.redirect("/");
        }
      });
    }
  },
  logOut: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
  userList: async (req, res) => {
    const users = await User.findAll({
      include: Role,
    });
    res.render("list_users", { users });
  },

  update: async (req, res, next) => {
    const user = await User.findByPk(req.params.id, { raw: true });
    res.render("form_user", { user });
  },

  postUpdate: async (req, res) => {
    const user = await User.update(
      { lastName: req.body.lastName },
      { firstName: req.body.firstName },
      { email: req.body.email },
      { phone: req.body.phone }
    );
    res.render("form_user", { user });
  },
};
