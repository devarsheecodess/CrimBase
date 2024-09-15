const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const faces = new Schema({
    id: String,
    photo: String,
});

const Faces = mongoose.model("Faces", faces);
module.exports = Faces;