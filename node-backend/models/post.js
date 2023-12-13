const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
    description: {
        type:String,
        required:true,
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    }
},{
    timestamps:true

})

const post = mongoose.model('post', postSchema)

module.exports = post;