const express = require('express')
var multer = require("multer")
const path = require('path')
const CATEGORY_UPLOAD_FOLDER = process.env.CATEGORY_UPLOAD_FOLDER
const tempMulter = multer({ dest: CATEGORY_UPLOAD_FOLDER }) //create for create atomatic folder

var storage = multer.diskStorage({
      destination: function (req, file, cb) {
            const filePath = path.join(__dirname, "../" + CATEGORY_UPLOAD_FOLDER)
            cb(null, filePath)
      },
      filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + ".png")
      }
})

var upload = multer({ storage });


const { getCategories ,
      createCategory ,
       getCategory,
       getProductsByCategory
      } = require('../controller/category-controller')

const { adminAuthMiddleware } =  require('../middlewares/user-auth-middleware')

const categoryRouter =  express.Router()
categoryRouter.get('/',getCategories)
categoryRouter.get('/:categoryId',getCategory)
categoryRouter.get('/:categoryId/products',getProductsByCategory)

categoryRouter.post('/',upload.single('categoryimage'),createCategory)

module.exports = {categoryRouter} 
 