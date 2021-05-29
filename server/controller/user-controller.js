const Joi = require('joi');
const { User } = require('../models/user')
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken');
const { Order } = require('../models/order');

// ***********************************************************************
async function getUser(req, res, next) { //checking user api working or not
      const bearerToken = req.headers.authorization
      if (!bearerToken) {
            return res.status(401).send("login first")
      }
      let token = null;
      token = bearerToken.split(" ")[1];
      const varifyuser = jwt.verify(token, process.env.JWT_KEY)
      console.log("LogInUser", varifyuser._id);

      const LogInUser = await User.find({ _id: varifyuser._id })
      res.json(LogInUser)
}
// ***********************************************************************
async function userOrders(request, response, next) {
      const bearerToken = request.headers.authorization
      if (!bearerToken) {
            return response.status(401).send("login first")
      }
      let token = null;
      token = bearerToken.split(" ")[1];
      const varifyuser = jwt.verify(token, process.env.JWT_KEY)
      const orderResult = await Order.find({ user: varifyuser._id }).populate([
            {
                  path: "product",
                  populate: [{ path: "category" }]
            },  //deep down populate "category"
            { path: "user", select: "-password" } // populate expect password
      ])
      response.json(orderResult)
}

//************* start : save user function or user registration ***************

function validateUserForRegistration(user) {
      const schema = Joi.object({
            first_name: Joi.string().min(4).max(40),
            last_name: Joi.string().min(6).max(40),
            address: Joi.string().min(6),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(40).required(),
            repassword: Joi.string().min(6).max(40).required(),
            phone: Joi.string().min(10).max(12)
      });
      const result = schema.validate(user)
      return result;
}

async function saveUser(request, response, next) {
      const result = validateUserForRegistration(request.body)
      console.log("data", result);
      if (result.error) {
            response.status(400);
            console.log("error", result.error);
            return next(new Error(result.error.details[0].message))
      }
      const userData = result.value;
      if (userData.password != userData.repassword) {  // both pass match or not
            response.status(400);
            console.log(" password not match");
            return next(new Error('password not matched'))
      }
      let isExists = await User.isExists(userData.email)  // is this email exist 
      if (!isExists) {
            userData.password = passwordHash.generate(userData.password)
            user = await new User(userData).save()

            const token = await jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: "999 days" })

            response.cookie("jwt", token, {
                  expires: new Date(Date.now() + 60 * 60 * 60 * 24 * 30),
                  httpOnly: true
            })

            response.json({ msg: "register successful", token })

      } else {
            response.status(400);
            return next(new Error('email already exist'))
      }
}

// **********************start: login user **************************

function validateLoginCredentials(body) {
      const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(40).required()
      });

      const result = schema.validate(body)
      return result;
}

async function loginUser(request, response, next) {
      const result = validateLoginCredentials(request.body);
      if (result.error) {
            response.status(400);
            const err = new Error(result.error.details[0].message);
            return next(err)
      }

      const { email, password } = result.value;
      const user = await User.findOne({ email });

      if (user) {
            const isPasswordMatched = passwordHash.verify(password, user.password)
            if (isPasswordMatched) {

                  payload = {
                        _id: user._id,
                        email: user.email,
                        phone: user.phone,
                        isAdmin: user.isAdmin
                  }

                  const token = await jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "999 days" })

                  response.cookie("jwt", token, {
                        expires: new Date(Date.now() + 60 * 60 * 60 * 24 * 30),
                        httpOnly: true
                  })

                  response.json({ msg: "login successful", token })
            }
      }

      response.status(400);
      const err = new Error("Email or password is invalid");
      return next(err)
}

//************** start : Update loged in user ****************

async function updateUser(request, response, next) {

      const bearerToken = request.headers.authorization
      if (!bearerToken) {
            return response.status(401).send("login first")
      }
      let token = null;

      token = bearerToken.split(" ")[1];

      const loggedInUser = jwt.verify(token, process.env.JWT_KEY)

      console.log("logged in user", loggedInUser);

      const schema = Joi.object({
            phone: Joi.string().min(10).max(13),
            first_name: Joi.string().min(4).max(40),
            last_name: Joi.string().min(6).max(40),
            address: Joi.string().min(6),
            password: Joi.string().min(6).max(40),
            email: Joi.string().min(6).max(40)
      });

      const result = schema.validate(request.body);
      // result.value.password = passwordHash.generate(result.value.password)

      if (result.error) {
            return next(new Error(result.error.details[0].message));
      } else {
            const user = await User.findOneAndUpdate(
                  { _id: loggedInUser._id }, { $set: result.value}, { new: true }
            ); 
      }
      response.json({ msg: "update req" })
}

// ************** start : Update another user (only admin can) ****************

async function updateUserById(request, response, next) {
      const user_id = request.params.user_id;
      console.log("logged in user", request.body);

      // let user = await User.findById(user_id),
      // user = Object.assign(user, request.body);
      // user = await user.save();

      const user = await User.findOneAndUpdate(
            { _id: user_id },
            {
                  $set: request.body,
            }, {
            new: true
      }
      );

      response.json(user)
}



module.exports = { getUser, saveUser, loginUser, updateUser, updateUserById, userOrders }
