const { StatusCodes } = require("http-status-codes");
const User = require("../middle/userModel");

let userController = {
  readAll: async (req, res) => {
    try {
      let data = await User.find({});

      res
        .status(StatusCodes.ACCEPTED)
        .json({ status: true, length: data.length, users: data });
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: false, msg: err });
    }
  },

  readSingle: async (req, res) => {
    try {
      let id = req.params.id;

      let single = await User.findById(id);
      res.status(StatusCodes.OK).json({ user: single });
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: false, msg: err });
    }
  },
  createUser: async (req, res) => {
    try {
      let { name, email, mobile, age } = req.body;

      //check wherther data lready exists or not
      let extEmail = await User.findOne({ email });
      if (extEmail)
        res
          .status(StatusCodes.CONFLICT)
          .json({ status: false, msg: `{email} already exists `});

      let extMobile = await User.findOne({ mobile });
      if (extMobile)
        res
          .status(StatusCodes.CONFLICT)
          .json({ status: false, msg:` ${mobile} already exists` });

      //store the valye in database
      let newUser = await User.create({ name, email, mobile, age });

      res
        .status(StatusCodes.CREATED)
        .json({
          status: true,
          msg: "user info created succesfully ",
          user: newUser,
        });
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: false, msg: err });
    }
  },
  updateUser: async (req, res) => {
    try {
      let id = req.params.id;

      let extUser = await User.findById(id);
      if (!extUser) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ status: false, msg: "requested user id not found" });
      }
      //update method
      await User.findByIdAndUpdate({ _id: id }, req.body);

      res
        .status(StatusCodes.ACCEPTED)
        .json({ status: true, msg: "User info updated succesfully" });
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: false, msg: err });
    }
  },

  deleteUser: async (req, res) => {
    try {
      let id = req.params.id;

      let extUser = await User.findById(id);

      if (!extUser) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ status: false, msg:` Requetsed user id not found` });
      }

      //delete

      await User.findByIdAndDelete({ _id: id });

      res
        .status(StatusCodes.Ok)
        .json({ status: true, msg: "user info deleted" });
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: false, msg: err });
    }
  },
};

module.exports = userController;