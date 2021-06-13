const express = require('express') 
const { userAuthMiddleware } = require('../middlewares/user-auth-middleware')
const { Rating } = require('../models/ratings')
const ratingRouter = express.Router()

ratingRouter.get ('/',async(req,res)=>{

    const rating = await Rating.find().populate([
        {
              path: "user" 
        },  //deep down populate "category"
        { path: "product" } // populate expect password
  ])
    res.json({rating})
})

ratingRouter.post('/', async(req, res) => {
    console.log("rating",req.body);
    user = await new Rating(req.body).save()
    res.json({ msg: "rating successful" })
})
  
module.exports = { ratingRouter }
