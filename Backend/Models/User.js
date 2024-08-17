const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: String,
  role: { type: String, default: "user" },
  policeID: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdOn: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'Users' }); // Explicitly set collection name

module.exports = mongoose.model('User', UserSchema);
