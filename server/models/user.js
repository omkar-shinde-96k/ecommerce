const mongoose = require('mongoose');
const Schema = mongoose.Schema
const userSchema = new Schema({
      first_name: { type: String, require: true },
      last_name:{type:String, require:true},
      isAdmin: { type: Boolean, default: false },
      profile_pic:{type:String},
      email: { type: String, require: true },
      password: { type: String, require: true },
      address:{type:String,require:true},
      active: { type: Boolean, require: true, default: true },
      phone: { type: String }
},{
      timestamps: {
            createAt: 'created_at', updateAt: 'updated_at'
      }
}
)

userSchema.statics.isExists = async function isExists(email) {
      console.log("is Exists method");
      console.log(email);
      const user = await this.findOne({ email: email })
      return user ? true : false;
}


const User = mongoose.model('user', userSchema)

module.exports = {User};