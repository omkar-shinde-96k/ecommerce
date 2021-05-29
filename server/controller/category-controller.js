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

async function createCategory(request, response ,next){

      const bearerToken = request.headers.authorization
      console.log(request.body);
      if (!bearerToken) {
            return response.status(401).send("login first")
      }
      let token = null;
      
      token = bearerToken.split(" ")[1]; 

      const loggedInUser = jwt.verify(token, process.env.JWT_KEY)
   
      console.log("logged in user", loggedInUser);

      const schema =  Joi.object({
            name:Joi.string().min(3).max(40).required(),
      })

      const validateResult = schema.validate(request.body)

      if(!validateResult.error){
            const name = request.body.name;
            const category = new Category({name})
            const result = await category.save();
           return response.json(result)
      }

      const error = new Error(validateResult.error.details[0].message);
      return next(error) 
}

async function getProductsByCategory(request, response){
      const products = await Product.find({category : request.params.categoryId})
      response.json({products})
} 

module.exports = {getCategories ,
       createCategory ,
       getCategory,
       getProductsByCategory}