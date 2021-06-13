const mongoose = require('mongoose'); 

const ratingSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'user'},
    product: { type: mongoose.Types.ObjectId, ref: 'product' },
    rating: { type: Number },
    title: { type: String },
    details: { type: String }

}, {
    timestamps: {
        createAt: 'created_at',
        updateAt: 'updated_at'
    }
}) 
const Rating = mongoose.model('Rating', ratingSchema) 
module.exports = { Rating }