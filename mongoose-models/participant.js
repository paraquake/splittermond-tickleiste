'use strict';
var mongoose = require('mongoose'),
  ObjectId = mongoose.Schema.Types.ObjectId;

var ParticipantSchema = mongoose.Schema({
  id: ObjectId,
  name: String,
  tick: Number,
  waiting: Boolean,
  lastTickChange: Date,
  tickleisten: {
    ref: 'Tickleiste',
    type: ObjectId
  }
});

module.exports = mongoose.model('Participant', ParticipantSchema);
