const express = require('express')
var multer = require("multer")
const path = require('path')
const UPLOAD_FOLDER = process.env.UPLOAD_FOLDER
const tempMulter = multer({ dest: UPLOAD_FOLDER }) //create for create atomatic folder

var storage = multer.diskStorage({
      destination: function (req, file, cb) {
            const filePath = path.join(__dirname, "../" + UPLOAD_FOLDER)
            cb(null, filePath)
      },
      filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + ".png")
      }
})

var upload = multer({ storage });

const { getProducts,
      createProduct,
      getProduct
} = require('../controller/product-controller')

const { adminAuthMiddleware } = require('../middlewares/user-auth-middleware')

const productRouter = express.Router()

productRouter.get('/', getProducts)
productRouter.get('/:productId', getProduct)
productRouter.post('/', adminAuthMiddleware, upload.single('image'), createProduct)

module.exports = { productRouter }


