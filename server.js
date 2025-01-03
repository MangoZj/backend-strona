require("dotenv").config(); 
const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express(); 
const PORT = process.env.PORT || 3000; 

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Połączono z MongoDB"))
    .catch((err) => console.error("Błąd połączenia z MongoDB:", err));

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
    });

    app.get("/", (req, res) => {
        res.send("Serwer działa!");
    });

    app.post("/upload", (req, res) => {
        const file = req.body.image; 
        cloudinary.uploader.upload(file, (err, result) => {
            if (err) {
                res.status(500).send("Błąd przesyłania obrazu");
            } else {
                res.status(200).send({ url: result.secure_url });
            }
        });
    });
    
    app.listen(PORT, () => {
        console.log(`Serwer działa na porcie ${PORT}`);
    });
    