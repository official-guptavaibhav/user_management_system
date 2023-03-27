const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_img: { type: String },
    date_of_birth: { type: String, require: true }
},{ timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);