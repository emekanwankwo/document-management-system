//  Defines various services for the role object

const Sequelize = require('sequelize');
// Require sequelize from the connection settings
const sequelize = require('../../settings/connect');

// Call the role model and specify the arguments.
const Role = require('../../app/models/role')(sequelize, Sequelize);

sequelize.sync({});

/**
 * Create a new role
 * @param {object} req
 * @param {function} res // Object
 * @returns {boolean} true if created,false otherwise
 */
module.exports.createRole = (req, res) => {
  Role.findOrCreate({
    where: {
      title: req.body.title
    },
    defaults: {
      title: req.body.title
    }
  })
  .spread((role, created) => {
    if (!created) {
      return res.status(400).send({ message: 'Role Already Exists!' });
    }
    return res.status(201).send({ message: 'Role Added!' });
  });
};

/**
 * Get role
 * @param {object} req
 * @param {function} res // Object
 * @returns {object} specified role.
 */
module.exports.getRole = (req, res) => {
  Role.find({
    where: {
      id: req.params.id
    }
  }).then((role) => {
    if (!role) {
      return res.status(404).send({ message: 'Role Not found' });
    }
    return res.status(200).send(role);
  }
  );
};

/**
 * Get all roles
 * @param {object} req
 * @param {function} res // Object
 * @returns {object} all roles.
 */
module.exports.getAllRoles = (req, res) => {
  Role.findAll().then((roles) => {
    if (!roles) {
      return res.status(404).send({ message: 'No role found' });
    }
    return res.status(200).send(roles);
  }
  );
};
