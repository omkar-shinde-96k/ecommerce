const express = require('express') 
const { userAuthMiddleware } = require('../middlewares/user-auth-middleware')
const { Rating } = require('../models/ratings')
const ratingRouter = express.Router()

ratingRouter.get ('/:productId',async(req,res)=>{
    const product = req.params.productId
    const rating = await Rating.find({product}).populate([
        {
              path: "user" 
        },  //deep down populate "category"
        { path: "product" } // populate expect password
  ])
    res.json({rating})
})

ratingRouter.post('/', async(req, res) => { 
  console.log(req.body);
    try {
        user = await new Rating(req.body).save()
    } catch (error) {
        res.status(400).json({ msg: "title reqired" })
    }
    // res.status(200).json({ msg: "rating successful" })
})

module.exports = { ratingRouter }
