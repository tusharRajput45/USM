const userRegister = require("../model/userRegister");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie=require('cookie-parser')


const createToken = async (_id) => {
  try {
    const payload = { _id };
    const token = await jwt.sign(payload, "yourSecretKey", {
      expiresIn: 604800,
    });
    return token;
  } catch (error) {
    console.log(error.message);
  }
};
const securePassword = async (password) => {
  const securePassword = await bcrypt.hash(password, 10);
  return securePassword;
};
module.exports = {
  getUser:async(req,resp)=>{
      try {
        const getUser=await userRegister.findOne({_id:req.userId})
        if (getUser) {
          resp.send({
            status: "success",
            statusCode: "200",
            message: "successfully get user",
            data: getUser,
          });
        }
      } catch (error) {
        resp.send({
          status: "failure",
          statusCode: "404",
          message: "server error",
          error: error.message,
        });
      }
  },
  userRegister: async (req, resp) => {
    const checkEmail = await userRegister.findOne({ email: req.body.email });
    const checkMobile = await userRegister.findOne({ mobile: req.body.mobile });
    if (checkEmail) {
      resp.send({
        status: "failure",
        statusCode: "200",
        message: "email already register",
      });
    } else {
      if (checkMobile) {
        resp.send({
          status: "failure",
          statusCode: "200",
          message: "mobile already register",
        });
      } else {
        try {
          const hashPassword = await securePassword(req.body.password);
          const data = new userRegister({
            name: req.body.firstname + " " + req.body.lastname,
            email: req.body.email,
            mobile: req.body.mobile,
            password: hashPassword,
          });
          const saveData = await data.save();
          if (saveData) {
            resp.send({
              status: "success",
              statusCode: "200",
              message: "successfully save user",
              data: saveData,
            });
          } else {
            resp.send({
              status: "failure",
              statusCode: "201",
              message: "data not save",
            });
          }
        } catch (error) {
          resp.send({
            status: "failure",
            statusCode: "404",
            message: "server error",
            error: error.message,
          });
        }
      }
    }
  },
  userLogin: async (req, resp) => {
    try {
      const checkEmail = await userRegister.findOne({ email: req.body.email });
      if (checkEmail) {
        const camparePassword = await bcrypt.compare(
          req.body.password,
          checkEmail.password
        );
        if (camparePassword === true) {
          const token = await createToken(checkEmail._id);
          resp.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000,
          });
          resp.send({
            status: "success",
            statusCode: "200",
            message: "User Successfully Login",
            data: checkEmail,
            token: token,
          });
        } else {
          resp.send({
            status: "failure",
            statusCode: "201",
            message: "Password is not correct",
          });
        }
      } else {
        resp.send({
          status: "failure",
          statusCode: "404",
          message: "Email is not exist",
        });
      }
    } catch (error) {
      resp.send({
        status: "failure",
        statusCode: "404",
        message: "Email is not exist",
        error: error.message,
      });
    }
  },
  editUser: async (req, resp) => {
    try {
      const editUser = {};
      if (req.body.name) {
        editUser.name = req.body.name;
      }
      if (req.body.email) {
        editUser.email = req.body.email;
      }
      if (req.body.mobile) {
        editUser.mobile = req.body.mobile;
      }
      const update = await userRegister.findByIdAndUpdate(
        { _id: req.params._id },
        { $set: editUser },
        { new: true, runValidators: true }
      );
      resp.send({
        status: "success",
        statusCode: "200",
        message: "successfully edit user",
        data: update,
      });
    } catch (error) {
      resp.send({
        status: "failure",
        statusCode: "404",
        message: "server error",
        error: error.message,
      });
    }
  },
  deleteUser: async (req, resp) => {
    try {
      const data = await userRegister.deleteOne({ _id: req.params._id });
      resp.send({
        status: "success",
        statusCode: "200",
        message: "successfully delete user",
        data: data,
      });
    } catch (error) {
      resp.send({
        status: "failure",
        statusCode: "404",
        message: "server error",
        error: error.message,
      });
    }
  },
  logoutUser: async (req, resp) => {
    try {
      const result = await userRegister.findOne({ _id: req.params._id });
      if (result) {
        resp.clearCookie('token');
        resp.send({
          status: "success",
          statusCode: "200",
          message: "user successfully logout",
        });
      }
    } catch (error) {
      resp.send({
        status: "failure",
        statusCode: "404",
        message: "server error",
        error: error.message,
      });
    }
  },
};
