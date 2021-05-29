const { Mongoose } = require("mongoose")

const mongoose = require('mongoose');
const Schema = mongoose.Schema

 const orderSchema = new Schema ({
      price:{type :Number,required:true},
      product :{type:mongoose.Types.ObjectId, ref:'product',required:true}, 
      user :{type:mongoose.Types.ObjectId, ref:'user',required:true},
      address:{type:String, required:true},
      quantity:{type:Number,required:true , default:1},
      payment_method:{type:String, default:"COD"},
      status:{type:String,default:"placed"},
      delivar_on:{type:String}
       },{
       timestamps:{
             createdAt:'created_at',
             updatedAt:'updated_at'
       }
 })

 const Order=mongoose.model('order', orderSchema)
 
 module.exports={Order}

