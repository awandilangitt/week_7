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

// //insert new data
// await UsersModel.create({fullName: "John Mayer", age: 34 })

//get existing data
    // const data = await UsersModel.find({})
    // console.log(data);

    //update data
    // await UsersModel.updateOne(
    //     {_id: "600e87529070c695f7fd5f53"},
    //     {age: 40}
    //     );
        // const data = await UsersModel.find({})
        // console.log(data);

        //delete data
        await UsersModel.deleteOne(
            {_id:"600e87529070c695f7fd5f53"});
        const data = await UsersModel.find({})
        console.log(data);
})();

