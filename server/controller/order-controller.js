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

async function placeOrders(req, res, next) {

      // const schema = Joi.object({
      //       orders: Joi.array().items({
      //             product: Joi.string().required(),
      //             user: Joi.string().required(),
      //             address: Joi.string().required(),
      //             quantity: Joi.number().min(1).required(),
      //             price: Joi.number().required(),
      //             status: Joi.string().required(),
      //             payment_method: Joi.string().required()
      //       }).required().min(1),
      // });

      // const validationResult = schema.validate(req.body)
      // console.log(req.body);
      // if (validationResult.error) {
      //       return next(new Error(validationResult.error.details[0].message))
      // }

      // const { orders } = validationResult.value;

      // for (index in orders) {
      //       let order = orders[index]
      //       let productResults = await Product.findOne({ _id: order.product }, { new: true })
      //       orders[index].price = productResults.price;
      // }

      // const saveResult = await Order.create(orders)

     

      const { payment_method,status,product,user,address,quantity,price}=req.body;

      console.log(quantity);

      const order = new Order({
            payment_method,
            status,
            product,
            quantity,
            price,
            address,
            user
        })
        order.save().then(result=>{
            res.json({orders:result})
        })
        .catch(err=>{
            console.log(err)
        })
    
 
      // console.log(saveResult);




      // res.json({ orders: saveResult });
}

module.exports = { getOrders, placeOrders, deleteOrder, updateOrder }