'use strict';
var mongoose = require('mongoose'),
  ObjectId = mongoose.Schema.Types.ObjectId;
var TickleisteSchema = mongoose.Schema({
  id: ObjectId,
  participants: {
    ref: 'Participant',
    type: ObjectId
  }
});
module.exports = mongoose.model('Tickleiste', TickleisteSchema);
