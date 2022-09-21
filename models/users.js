const joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    required: true,
    type: String,
    minlength: 6,
    maxlength: 320,
  },
  password: {
    required: true,
    type: String,
    minlength: 8,
    maxlength: 1024,
  },
  createdAT: {
    type: Date,
    default: Date.now,
  },
  biz: {
    required: false,
    type: Boolean,
  },

  cards: Array,
});


userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      biz: this.biz,
      email: this.email,
    },
    process.env.JWT_SECRET
  );

  return token;
};

const schema = joi.object({
  name: joi.string().min(2).max(255).required(),
  email: joi
    .string()
    .min(6)
    .max(320)
    .required()
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
  password: joi.string().min(8).max(1024).required(),
  biz: joi.boolean(),
});

const userCardschema = joi.object({
  cards: joi.array().min(1).required(),
});

function validateCards(data) {
  return userCardschema.validate(data);
}

function validateUser(user) {
  return schema.validate(user, {
    abortEarly: false,
  });
}

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  validateUser,
  validateCards,
};
