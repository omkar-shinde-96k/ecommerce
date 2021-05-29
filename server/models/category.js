 const mongoose = require('mongoose');

const Schema = mongoose.Schema
const categorySchema = new Schema({
      name: { type: String, require: true },
}, {
      timestamps: {
            createAt: 'created_at',
            updateAt: 'updated_at'
      }
})

const Category= mongoose.model('category',categorySchema)

module.exports={Category};