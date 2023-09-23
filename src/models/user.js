const { Schema, model, models } = require('mongoose')
const { string } = require('zod')

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const User = models.User || model('User', UserSchema)
export default User
