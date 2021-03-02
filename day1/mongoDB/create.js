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

//insert new data
await UsersModel.create({fullName: "Lenny Kravitz", age:45});
await UsersModel.create({fullName: "Kurt Cobain", age: 27});
await UsersModel.create({fullName: "Jim Moorison", age: 27});
await UsersModel.create({fullName: "Freddy Mercury", age: 47});
await UsersModel.create({fullName: "Jimi Hendrix", age: 27});
await UsersModel.create({fullName: "Erick Martin", age: 25});
await UsersModel.create({fullName: "Paul Gi(lbert", age: 30});
await UsersModel.create({fullName: "Brian May", age: 47});
await UsersModel.create({fullName: "David Lee Roth", age: 29});
await UsersModel.create({fullName: "Dave Grohl", age: 26});
console.log("Insert data succeed");


})();