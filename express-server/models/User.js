const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
