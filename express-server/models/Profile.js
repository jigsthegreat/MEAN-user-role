const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Profile', profileSchema);
