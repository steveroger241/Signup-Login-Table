const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose
    .connect(process.env.mongo)
    .then(()=>{
        console.log("Mongo is connected");
    })
    .catch((err)=>{
        console.log("Error is ----> ", err);
    })

module.exports = mongoose;