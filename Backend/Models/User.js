const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {type: String, required: true, unique: true},
    role: { type: String, default: "user" },
    StationName: { type: String, required: true },
    Address: { type: String, required: true },
    City: { type: String, required: true },
    State: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    Incharge: { type: String, required: true },
    policeID: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Users" }
);

module.exports = mongoose.model("User", UserSchema);