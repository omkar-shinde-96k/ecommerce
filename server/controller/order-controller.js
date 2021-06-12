const Joi = require('Joi')
const { Product } = require('../models/product')
const { Order } = require('../models/order')
const { request } = require('express')
 
async function getOrders(req, res) {
      // const orders = await Order.find().populate("user product")
      const orders = await Order.find().populate([
            {
                  path: "product",
                  populate: [{ path: "category" }]
            },  //deep down populate "category"
            { path: "user", select: "-password" } // populate expect password
      ])
      res.json({ orders })
}

async function deleteOrder(req, res, next) {
      const _id = req.params.orderId;
      const result = await Order.deleteOne({ _id })
      res.json({ result, msg: "delete order" })
}

async function updateOrder(req, res, next) {
      const _id = req.params.orderId;
      const body = request.body;
      console.log("update router func run");
      const result = await Order.findOneAndUpdate({ _id }, { $set: body }, { new: true })
      res.json({ result, msg: "update order" })
}

async function placeOrders(req, res) { 
      const { orders } = req.body;
      console.log("body is",req.body);

      // for (index in orders) {
      //       let order = orders[index];
      //       let productId = order.product;
      //       let price = (await Product.findOne({ _id:productId})).price;
      //       orders[index].price =price;
      // } 

      const saveResult = await Order.create(orders)
      res.json({ orders:saveResult,msg:"orderplaced" });
 
}

module.exports = { getOrders, placeOrders, deleteOrder, updateOrder }