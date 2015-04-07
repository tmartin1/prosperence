'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  text: String, // This is the actual question.
  active: Boolean, // If question is active or not.
  author: String, // Who asked the question.
  rating: { // Keeps track of how many users starred the question.
    type: Number,
    default: 0
  },
  comments: [{ // Replies to the question.
    name: String, // Name of who replied (links to profile if advisor).
    text: String, // Reply message.
    rating: Number, // Keeps track of up/down votes of the comment.
    isAdvisor: Boolean, // True is the reply is from an advisor, false if not.
    type: {
      type: { type: String }
    },
    registrationEnabled: Boolean,
    checkinEnabled: Boolean
  }]
});

module.exports = mongoose.model('Question', QuestionSchema);
