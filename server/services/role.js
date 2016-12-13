//  Defines various services for the role object

const Sequelize = require('sequelize');
// Require sequelize from the connection settings
const sequelize = require('../../settings/connect');
const userService = require('./user');

// Call the role model and specify the arguments.
const Role = require('../../app/models/role')(sequelize, Sequelize);

sequelize.sync({ });

/**
 * Create a new role
 */
module.exports.createRole = (req, done) => {
  userService.getUserRole(req.user, (data) => {
    if (data !== 1) {
      done(false);
    }
    Role.findOrCreate({
      where: {
        title: req.newrole.title
      },
      defaults: {
        title: req.newrole.title
      }
    })
    .spread((role, created) => {
      // Return true if the role is created or already exists
      done(true);
    });
  });
};

module.exports.getRole = (req, done) => {
  if (req.title) {
    Role.findOne({ where: { title: req.title } }).then((data) => {
      done(data);
    });
  }
};

module.exports.getAllRoles = (req, done) => {
  Role.findAll().then((roles) => {
    done(roles);
  });
};