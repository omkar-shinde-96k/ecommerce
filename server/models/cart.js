const mongoose = require('mongoose');
 
const cartSchema = new mongoose.Schema({
      user_id:{type:mongoose.Types.ObjectId,ref:'user', require:true},
      product:{type:mongoose.Types.ObjectId,ref:'product', require:true},
      quantity:{type:Number,default:1}
      
}, {
      timestamps: {
            createAt: 'created_at',
            updateAt: 'updated_at'
      }
})

const Cart= mongoose.model('cart',cartSchema)

module.exports={Cart}