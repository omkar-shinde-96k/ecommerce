const express = require('express')
const {
       getUser ,
       saveUser ,
       loginUser ,
       updateUser ,
       updateUserById,
       userOrders
      } = require('../controller/user-controller')

const {userAuthMiddleware , adminAuthMiddleware} =  require('../middlewares/user-auth-middleware')

const userRouter = express.Router()

userRouter.get('/',getUser);  //to check router is working or not
userRouter.post('/',saveUser); //register new user
userRouter.put('/',userAuthMiddleware, updateUser);  //update login user
userRouter.put('/:user_id',adminAuthMiddleware, updateUserById); //admin can update any user
userRouter.post('/login',loginUser);
userRouter.get('/orders',userAuthMiddleware,userOrders);   // orders of login user

module.exports = {userRouter};

 