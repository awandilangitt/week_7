const mongoose = require ("mongoose");

module.exports = async function mongoConnect(){
    //connect to mongo server
    await mongoose.connect('mongodb://localhost:27017/binaracademy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
    });
};