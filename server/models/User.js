const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const IMG_URL = /.*\.(gif|jpe?g|bmp|png)$/gim;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  picture: {
    type: String,
    default: "https://i.stack.imgur.com/l60Hf.png"
  },
  role: {
    type: String,
    enum: ["Mami", "Sister"],
    default: "Mami"
  },
  description: {
    type: String,
  },
  coments: {type: Schema.Types.ObjectId, ref: ""},
  geo: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    }
  },

}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      delete ret.createdAt;
      return ret;
    }
  }
});

userSchema.index({
  location: '2dsphere'
});


const User = mongoose.model("User", userSchema);
module.exports = User;