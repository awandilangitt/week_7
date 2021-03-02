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

const data = [
    {
        nama: "John Travolta",
        age: 34
    },
    {
        nama: "John Lennon",
        age: 40
    }
];

//initiate allowed keys
const allowedKeys = ["fullName", "age"];

try {
    // Looping Check
    for (let index = 0; index < data.length; index++) {
      // Manual Way
      // if (!data[index].fullName) {
      //   console.log(`data key fullName tidak ada`);
      //   return;
      // }

      // if (!data[index].age) {
      //   console.log(`data key age tidak ada`);
      //   return;
      // }

      // Looping way
      const requestKeys = Object.keys(data[index]);

      for (let index2 = 0; index2 < requestKeys.length; index2++) {
        if (!allowedKeys.includes(requestKeys[index2])) {
          throw new Error(`data ${requestKeys[index2]} tidak sesuai format`);
        }
      }
    }

    await UsersModel.create(data);

    console.log("success insert data to users schema");

  } catch (error) {
    console.log("ada yang gak beres");
  }
})();



// const data = {id:1, name: "John", age:20}
// const keysData = Object.keys(data) //["id", "name", "age"]

// const data2 = {id:2, name: "Budi", age:30}
// const keysData2 = Object.keys(data2) //["id", "name", "age"]

// for(let i = 0; i< keysData2.length; i++){
//     if(!keysData.includes(keysData2[i])){
//         console.log('data key ${keysData2[i]} tidak sesuai format')
//         break;
//     }
// }
