const express = require('express')
const {addCart,getCart} = require('../controller/cart-controller.js')

const {adminAuthMiddleware , userAuthMiddleware} =  require('../middlewares/user-auth-middleware')
const cartRouter =  express.Router()

cartRouter.get('/',userAuthMiddleware,getCart)
cartRouter.post('/',userAuthMiddleware,addCart)
cartRouter.delete('/:orderId ',userAuthMiddleware,addCart);
cartRouter.put('/:orderId ',userAuthMiddleware,addCart);

module.exports = {cartRouter}
 