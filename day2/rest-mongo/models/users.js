const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = function UsersModel(){
    const usersSchema = new mongoose.Schema({
        fullName: String,
        age: Number
    });

    return mongoose.model("users", usersSchema);
};