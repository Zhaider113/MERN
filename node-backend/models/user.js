const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,

      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid')
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contain "password"')
        }
      },
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    token: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  },
)
/// relation with tasks
userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user_id',
})

/// for user profile
///userSchema.methods.getPublicProfile = function () {
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  return userObject
}
/// for using jwt//
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

  user.token = token
  await user.save()
  return token
}

/// for logging in///
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
    console.log(user, email)
  if (!user) {
    throw new Error('User not found')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('unable to login')
  }
  return user
}

// hash the plain text password to hash before saving//
userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
