const express = require('express')
const { getOrders ,
      placeOrders,
      deleteOrder ,
      updateOrder
} = require('../controller/order-controller')
const {adminAuthMiddleware , userAuthMiddleware} =  require('../middlewares/user-auth-middleware')
const orderRouter =  express.Router()

orderRouter.get('/',userAuthMiddleware, getOrders)
orderRouter.post('/',userAuthMiddleware,placeOrders)
orderRouter.delete('/:orderId',deleteOrder);
orderRouter.put('/:orderId' , updateOrder);

module.exports = {orderRouter}
 