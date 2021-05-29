const mongoose= require('mongoose')
const Schema =  mongoose.Schema

const productSchema = new Schema({
      name : {type:String, require:true},
      details : {type:String, require:true},
      price:{type:Number,default:0},
      discount:{type:Number,default:10},
      productImage:{type:String,require:true},
      category:{type:mongoose.Types.ObjectId,ref:'category', require:true},
      active:{type:Boolean,default:true},
      delivery_charges:{type:String,default:"FREE Delevery by Amazon"}, 
      rating:[{type:mongoose.Types.ObjectId,ref:'user'}],
      buyer:[{type:mongoose.Types.ObjectId,ref:'user'}],
      reviews:[{
            text:String,
            postedBy:{type:mongoose.Types.ObjectId,ref:'user'}
        }],
},{
      timestamps: {
            createAt: 'created_at', updateAt: 'updated_at'
      }
})

const Product= mongoose.model ('product',productSchema)

module.exports = {Product}