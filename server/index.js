const express = require('express');
require("dotenv").config(); // enviroment variable config
require('./database/connection')()
const PORT = process.env.PORT || 3000
const app = express();
const morgan = require('morgan');

const handleError = require('./middlewares/error-handler');

const { categoryRouter } = require('./router/category-router');
const { orderRouter } = require('./router/order-router');
const { productRouter } = require('./router/product-router');
const { userRouter } = require('./router/user-router');
const { cartRouter } = require('./router/cart-router');

app.use(express.json());
app.use(morgan('dev')); 
app.get('/', (req, res) => {
      res.json({ "msg": "hello world" })
})

const APIRouter = express.Router()
app.use('/api', APIRouter)

APIRouter.get('', (req, res) => res.json({ 'msg': 'api is working' }))
APIRouter.use('/users', userRouter)
APIRouter.use('/product', productRouter)
APIRouter.use('/orders', orderRouter)
APIRouter.use('/categories', categoryRouter)
APIRouter.use('/cart', cartRouter)

 
APIRouter.get("/"+process.env.UPLOAD_FOLDER+"/*", (req, res, next) => {
      const path = req.url; 
      const filePath = `${__dirname}${path}` 
      res.sendFile(filePath); 
      next()   // for show normal error => cannot get ....
}); 

app.use(handleError)














app.listen(PORT, () => {
      console.log(`server listning on port ${PORT}`)
})
