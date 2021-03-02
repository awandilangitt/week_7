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

    //update data
    await UsersModel.updateMany
        // (
        // {fullName: "Dave Grohl"},
        // {age: 99}
        // ),
        (
            {_id: "600ee83f5864c2abbf6762f2"},
            {age: 55}
        );
        // (
        //     {fullName: "Jim Moorison"},
        //     {age: 123}
        // ),
        // (
        //     {fullName: "Freddy Mercury"},
        //     {age: 28}
        // ),
        // (
        //     {fullName: "Jimi Hendrix"},
        //     {age: 22}
        // );
        // const data = await UsersModel.find({})
        // console.log(data);


        console.log("Update data succeed");
})();

