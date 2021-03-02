const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Koneksi ke server mongo db
mongoose.connect("mongodb://localhost:27017/jwtauth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Buat schema tabel users
const UsersSchema = new mongoose.Schema({
  username: String,
  password: String,
  salt: String,
});

// Buat model users
const UsersModel = mongoose.model("users", UsersSchema);

// Middleware Authentikasi
const middlewareAuth = (req, res, next) => {
  try {
    // Split Bearer Token
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, "b1n4r4c4d3my");

    res.locals.user = decodedToken;

    next();
  } catch (error) {
    res.status(400).json({ message: "token invalid" });
  }
};

const app = express();
// Nerima request dari req.body raw json
app.use(bodyParser.json());
// Nerima request dari req.body x-www-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Routing Login
 * Routing ini berguna untuk proses login dari users
 */
app.post("/login", async (req, res) => {
  let statusCode = 500;

  try {
    const username = req.body.username;
    const password = req.body.password;

    // Cari data di mongodb dengan username dari req.body
    const users = await UsersModel.findOne({ username: username });

    // Melakukan pengecekan apakah data username ada atau tidak
    if (!users) {
      statusCode = 404;
      throw new Error("users not found");
    }

    // Membandingkan password dari req.body dengan password yang tersimpan di database
    const isPasswordMatch = await bcrypt.compare(password, users.password);
    if (!isPasswordMatch) {
      statusCode = 400;
      throw new Error("password invalid");
    }

    // Generate token JWT (Note: secret key dirubah sesuai selera)
    const token = jwt.sign({ username: users.username }, "b1n4r4c4d3my");

    // Buat response sukses
    res.json({
      message: "success login",
      data: {
        token: token,
      },
    });
  } catch (error) {
    // Buat response error
    res.status(statusCode).json({ message: error.message });
  }
});

/**
 * Routing Register
 * Routing ini berguna menambah/meregister data users ke database
 */
app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Generate secret key / salt with level 10
  const saltKey = await bcrypt.genSalt(10);

  // Merubah nilai password menjadi sebuah string hash
  const hashPassword = await bcrypt.hash(password, saltKey);

  // Memasukkan data username, hashPassword dan salt/secretkey ke dalam database
  await UsersModel.create({
    username: username,
    password: hashPassword,
    salt: saltKey,
  });

  // Beri respon kalau proses insert berhasil
  res.json({
    message: "success insert new users",
  });
});

/**
 * Routing yang memerlukan proses authentikasi
 * example: Routing untuk get semua data users dalam database
 */
app.get("/users", middlewareAuth, (req, res) =>
  res.json({ message: "success get profile", data: res.locals.user })
);

// Jalankan aplikasi di port 5000
app.listen(5000, () => console.log("this app running on port 5000"));