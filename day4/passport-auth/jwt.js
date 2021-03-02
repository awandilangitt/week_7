const express = require ("express");
const bodyParser = require ("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//koneksi ke server mongodb
mongoose.connect('mongodb://localhost:27017/jwtauth', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
    
//buat schema tabel users
const UsersSchema = new mongoose.Schema({
    username: String,
    password: String,
    salt: String
});

//buat model users
const UsersModel = mongoose.model('users', UsersSchema);

const middlewareAuth = (req, res, next) => {
    //split bearer token
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    console.log(jwt.verify(token, "b1n4r4c4d3my"));
    // console.log(req.headers); ==>buat headers di postman

    next();
};


const app = express();
//nerima request dari req.body raw json
app.use(bodyParser.json());
//nerima request dari req.body x-www-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

/**
 * Routing Login
 * routing berguna untuk proses login dari users
 */
 app.post("/login", async (req, res) => {
    let statusCode;

    try{
        const username = req.body.username;
        const password = req.body.password;

        //cari data di mongodb dengan username dari req.body
        const users = await UsersModel.findOne({username: username});

        //melakukan pengecekan apakah data username ada atau tidak
        if(!users) {
            statusCode = 404;
            throw new Error("users not found");
        }
        //membandingkan password dari req.body dengan password yang tersimpan di database
        const isPasswordMatch = await bcrypt.compare(password, users.password);
        if(!isPasswordMatch){
            statusCode = 400;
            throw new Error('password invalid');
        }

        //generate token JWT (note: secret key terserah)
        const token = jwt.sign({ username: users.username },'b1n4r4c4d3my');

        //buat respon suksess login
        res.json({
            message: "success login",
            data: {
                token:token,
            },
        });
    } catch (error) {
        res.status(statusCode).json({message: error.message})
    }
 });

 /**
  * Routing register
  * routing ini berguna menambah/meregister data users ke database
  */
 app.post("/register", async (req, res) => {
     const username = req.body.username;
     const password = req.body.password;

     //Generate secretKey / salt dgn lv 10
    const saltKey = await bcrypt.genSalt(10);

    //merubah nilai password jadi string hash
    const hashPassword = await bcrypt.hash(password, saltKey);

    //memasukan data username, hashPassword dan salt/secretKey ke database
    UsersModel.create({
        username: username,
        password: hashPassword,
        salt: saltKey
    });

    //beri respon kalau proses insert berhasil
     res.json({
        //  salt:secretKey,
        //  hash: hashPassword
        message: "success insert new user"
     });
 });

// routing yang memerlukan proses autentifikasi
// ex : routing untuk get semua data users dalam database
app.get("/users", middlewareAuth, (req, res) => 
res.json ({message: "success get profile", data: res.locals.user})
);

app.listen(5000, () => console.log("this app running on port 5000"));
