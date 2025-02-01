const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  question_en: { type: String },
  answer_en: { type: String },
  question_hi: { type: String },
  answer_hi: { type: String },
  question_bn: { type: String },
  answer_bn: { type: String },
});

module.exports = mongoose.model("FAQ", FAQSchema);