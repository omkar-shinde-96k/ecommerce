const express = require('express')
const {addCart,getCart,updateCart} = require('../controller/cart-controller.js')

const {adminAuthMiddleware , userAuthMiddleware} =  require('../middlewares/user-auth-middleware')
const cartRouter =  express.Router()

cartRouter.get('/',userAuthMiddleware,getCart)
cartRouter.post('/',userAuthMiddleware,addCart)
cartRouter.put('/:productId',userAuthMiddleware,updateCart)
cartRouter.delete('/:orderId ',userAuthMiddleware,addCart); 

module.exports = {cartRouter}
 