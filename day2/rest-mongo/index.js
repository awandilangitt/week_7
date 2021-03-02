const app = require("./src/app");
const mongoConnect = require("./src/mongoose");

(async ()=> {
    try{
        //start mongoDB connection
        await mongoConnect();
        //start apps
        app(5000);
    } catch (error){
        console.log (error)
        console.log("error app can't running");
    }
})();


