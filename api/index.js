const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const PORT = 8000;

const User = require("./models/User.js");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "ade93ue23932nqwe12e";

mongoose.connect(process.env.MONGODB_URL);

console.log(process.env.MONGODB_URL);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads",express.static(__dirname+'/uploads'));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(cookieParser());

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json({ userDoc });
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(userDoc);
          }
        );
      } else {
        res.status(422).json("Password incorrect");
      }
    } else {
      res.json("User not found");
    }
  } catch (e) {
    res.status(404).json(e);
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", async (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
    try {
        const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
        
    } catch (error) {
        res.status(400).json(error);
        
    }
  
});



const photosMiddleware = multer({dest:'uploads/'})
app.post("/upload",photosMiddleware.array('photos',100),(req,res)=>{

    const uploadedFiles = [];
    for(let i=0;i<req.files.length;i++){
        const {path,originalname} = req.files[i];
        console.log(path,originalname);
        const parts = originalname.split('.');
        const ext = parts[parts.length-1];
        const newPath =  path + '.' + ext;
        console.log(newPath);
        fs.renameSync(path,newPath);
        uploadedFiles.push(newPath);
    }
    res.json(uploadedFiles);

})

app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
});
