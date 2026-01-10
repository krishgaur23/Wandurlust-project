
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Latest versions of passport-local-mongoose export as ES Module
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

// Add passport-local-mongoose plugin (function, not object)
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
