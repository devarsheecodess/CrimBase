const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Criminal schema
const CriminalSchema = new Schema({
  id: { type: String, required: true, unique: true },
  photo: { type: String },
  name: { type: String, required: true },
  age: { type: Number },
  gender: { type: String, required: true },
  address: { type: String },
  dob: { type: Date },
  contact: { type: String },
  arrestedOn: { type: Date },
  arrestedBy: { type: String },
  crime: { type: String },
  state: { type: String },
  location: { type: String },
  height: { type: String },
  weight: { type: String },
  complexion: { type: String },
  prisonName: { type: String },
  bloodGroup: { type: String },
  dna: { type: String },
  stationName: { type: String },
  fingerprint: { type: String },
  comments: { type: String }
});

// Create the model
const Criminals = mongoose.model('Criminal', CriminalSchema);

module.exports = Criminals;