const {Category} = require('../models/category')
const {Product} = require('../models/product')
const jwt = require("jsonwebtoken");
const Joi = require('Joi');

async function getCategories(request, response){
      const categories = await Category.find()
      response.json({categories})
}
async function getCategory(request, response){
      const _id = request.params.categoryId
      const category = await Category.findOne({_id})
      response.json({category})
}
// ************************ create category *********************************

function validateCategory(data) {   //data == request.body
      const productSchema = Joi.object({
            name: Joi.string().required(),
      })

      const result = productSchema.validate(data)
      return result;
}

async function createCategory(request, response ,next){

      const bearerToken = request.headers.authorization
      if (!bearerToken) {
            return response.status(401).send("login first")
      }
      let token = null; 
      token = bearerToken.split(" ")[1];  
      const loggedInUser = jwt.verify(token, process.env.JWT_KEY) 

      console.log("reqbody",request.body)
      console.log("file",request.file)
      const categoryImage = "media/categories" + "/" + request.file.filename;

      const validationResult = validateCategory(request.body)

      if (validationResult.error) {
            return next(new Error(validationResult.error.details[0].message))
      }

      let category = new Category({
            ...validationResult.value,
            categoryImage
      })

      category = await category.save();
      response.json(category)
     
 
}

async function getProductsByCategory(request, response){ 
      let page = Number.parseInt(request.query.page) || 1
      const limit= Number.parseInt(request.query.products) || 8

      if(page<0){
            page=1
      }
     
      const skip = limit*(page-1)

      console.log("page",page);
      console.log("limit",limit);
      console.log("skip",skip);
      const products = await Product.find({category : request.params.categoryId}).limit(limit).skip(skip)
      const pages =Math.ceil(await Product.countDocuments() / limit)
      console.log("count",pages);

      const allproducts = await Product.find({category : request.params.categoryId}).limit(pages+1)
 
      response.json({products , allproducts})
}

module.exports = {getCategories ,
       createCategory ,
       getCategory ,
       getProductsByCategory}