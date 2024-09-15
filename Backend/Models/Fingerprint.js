const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fingerprintSchema = new Schema({
    id: String,
    fingerprint: String,
});

const Fingerprints = mongoose.model("Fingerprints", fingerprintSchema);
module.exports = Fingerprints;