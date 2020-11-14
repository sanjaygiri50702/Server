var mongoose = require('mongoose');
let Schema = mongoose.Schema;

const EventSchema = new Schema({  
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  noOfInterest: {
    type: Number,
    default: 0
  },
  coverPhoto: {
    type: String,
  },
  startDate:{
    type: Date,
    default: Date.now(),
  },
  endDate:{
    type: Date,
    default: Date.now(),

  },
  startTime:{
    type: String,
    default: Date.now(),

  },
  endTime:{
    type: String,
    default: Date.now(),
  },
  host:{
    type: String,
    default: Date.now(),
  },

  },
  { timestamps: true });

let Event = mongoose.model("Event", EventSchema);

  // Export the User model
module.exports = Event;