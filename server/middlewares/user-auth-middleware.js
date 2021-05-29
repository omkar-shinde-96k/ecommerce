const jwt = require("jsonwebtoken");
const { User } = require("../models/user.js")

const userAuthMiddleware = async (req, res, next) => {
      try {
            const bearerToken = req.headers.authorization;
            let token = null;
            token = bearerToken.split(" ")[1];

            jwt.verify(token, process.env.JWT_KEY, async(err, payload) => {
                  if (err) {
                        return res.status(401).json({ error: "you must be logged in" })
                  }
                  const { _id } = payload
                  const userdata = await User.find({ _id })
                  req.userdata = userdata
                  // console.log("onmkkkk", userdata);
                  next()

            })


      } catch (error) {
            console.log(error)
            res.status(401);
            return res.json(
                  [
                        {
                              "error": "login first",
                              "payment_method": "login first",
                              "status": "login first",
                              "_id": "login first",
                              "product": {
                                    "price": "login first",
                                    "discount": 0,
                                    "active": true,
                                    "_id": "login i",
                                    "name": "shart",
                                    "category": {
                                          "_id": "login first",
                                          "name": "login first",
                                          "createdAt": "2021-login first-14T14:36:12.061Z",
                                          "updatedAt": "2021-02-14T14:36:12.061Z",
                                          "__v": 0
                                    },
                                    "productImage": "media/products/image-1613313499734.png",
                                    "createdAt": "2021-02-14T14:38:19.800Z",
                                    "updatedAt": "2021-02-14T14:38:19.800Z",
                                    "__v": 0
                              },
                              "user": {
                                    "isAdmin": true,
                                    "active": true,
                                    "_id": "login first",
                                    "name": "  login first",
                                    "email": "login first",
                                    "phone": "login first",
                                    "createdAt": "login first",
                                    "updatedAt": "login first",
                                    "__v": 0
                              },
                              "address": "login first",
                              "quantity": 2,
                              "price": 250,
                              "created_at": "2021-02-14T14:44:37.040Z",
                              "updated_at": "2021-02-14T14:44:37.040Z",
                              "__v": 0
                        }
                  ]
            )
      }
}

function adminAuthMiddleware(request, response, next) {
      try {
            const bearerToken = request.headers.authorization
            let token = null;
            token = bearerToken.split(" ")[1];
            const payload = jwt.verify(token, process.env.JWT_KEY) 
            if (payload.isAdmin) {
                  return next()
            } 
            response.status(401);
            return response.json({ error: "only admin can change this information" })

      } catch (error) {
            response.status(401);
            return response.json({ error: "401 Unauthorized Errorz" })
      }
}

module.exports = { userAuthMiddleware, adminAuthMiddleware }