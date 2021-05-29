// const { request } = require('express')
const Joi = require('Joi')
const { Product } = require('../models/product')

async function getProducts(req, res) {
      const products = await Product.find()
      res.json(products)
}

async function getProduct(req, res) {
      const _id = req.params.productId
      const product = await Product.find({_id})
      res.json({product})
}

function validateProduct(data) {   //data == request.body
      const productSchema = Joi.object({
            name: Joi.string().required(),
            details: Joi.string(),
            price: Joi.number().min(1).required(),
            discount: Joi.number(),
            category: Joi.string().required(),
            active: Joi.boolean()
      })

      const result = productSchema.validate(data)
      return result;
}

async function createProduct(req, res ,next) {
      console.log("reqbody",req.body)
      console.log("file",req.file)
      const productImage = "media/products" + "/" + req.file.filename;

      const validationResult = validateProduct(req.body)

      if (validationResult.error) {
            return next(new Error(validationResult.error.details[0].message))
      }

      let product = new Product({
            ...validationResult.value,
            productImage
      })

      product = await product.save();
      res.json(product)
}

module.exports = { getProducts, createProduct ,getProduct}