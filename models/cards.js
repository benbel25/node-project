const joi = require("joi");
const mongoose = require("mongoose");
const _ = require("lodash");
const { User } = require("./users");
const Joi = require("joi");
const { number } = require("joi");

const cardSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  productDescription: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  productPrice: {
    type: Number,
    required: true,
    minlength: 2,
    maxlength: 500,
  },
  productQuantity: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 15,
  },
  productImage: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 1024,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Card = mongoose.model("card", cardSchema);

const cardjoiSchema = joi.object({
  productName: joi.string().min(2).max(255).required(),
  productDescription: joi.string().min(2).max(1024).required(),
  productPrice: joi.number().min(2).max(10000).required(),
  productQuantity: joi.number().min(1).max(15).required(),
  productImage: Joi.string().min(11).max(1024).uri().allow(""),
});

// const generateBizNumber = async () => {
//   while (true) {
//     let randomNumber = _.random(100, 9_999_999_999);
//     let card = await Card.findOne({ bizNumber: randomNumber });
//     if (!card) {
//       return String(randomNumber);
//     }
//   }
// };

const validateCard = (card) => cardjoiSchema.validate(card);

module.exports = {
  Card,
  validateCard,
};
