const mongoose = require ("mongoose");


(async () => {
    //Connect to mongodb server
    await mongoose.connect('mongodb://localhost:27017/binaracademy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
    });

    //init mongoose schema
    const Schema = mongoose.Schema;

    //create schema users (Migrations)
    const Users = new Schema({
        fullName: String,
        age: Number,
    });

    //create models users
const UsersModel = mongoose.model('users', Users);

//get data
const data = await UsersModel.find({_id:"600ee83f5864c2abbf6762f2"});
    console.log(data);


console.log("Get data succeed");


})();