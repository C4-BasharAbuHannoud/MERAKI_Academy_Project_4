require("dotenv").config();
const roleModel = require("../database/models/roleSchema");

const createNewRole = (req, res) => {
  const { permissions, role } = req.body;

  const newRole = new roleModel({
    permissions,
    role,
  });

  newRole
    .save()
    .then((role) => {
      if (req.body.role && req.body.permissions) {
        return res.status(201).json({
          success: true,
          massage: " Success Role created",
          role,
        });
      } else {
        return res.status(500).json({
          success: false,
          massage: "Server Error",
        });
      }
    })
    .catch((err) => {
      res.json({
        success: false,
        massage: "Server Error",
      });
    });
};

module.exports = {
  createNewRole,
};
