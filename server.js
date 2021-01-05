var express = require("express");
var bodyParser = require('body-parser');
var cors = require("cors");
var morgan = require("morgan");
const mongoose = require("mongoose");
const { stringify } = require("querystring");


/////////////////////////////////////////////////////////////////////////////////////////////////
let dbURI = "mongodb+srv://mobeengrs786:mobeengrs786@cluster0.dh1su.mongodb.net/hellotest?retryWrites=true&w=majority";
// let dbURI = 'mongodb://localhost:27017/abc-database';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////



var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    nationality: String,
    userId:String,
    gender: String,
    

    createdOn: { type: Date, 'default': Date.now }
});
var userModel = mongoose.model("users", userSchema);


var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));


app.post("/signup", (req, res, next) => {

    if (!req.body.name
        || !req.body.email
        || !req.body.password
        || !req.body.phone
        || !req.body.gender
        || !req.body.userId
        || !req.body.nationality) {

        res.status(403).send(`
            please send name, email, passwod, phone and gender in json body.
            e.g:
            {
                "name": "mobeen",
                "email": "mobeengrs@gmail.com",
                "password": "abc",
                "phone": "03001234567",
                "nationality":"Pakistani",
                "userId":"02144",
                "gender": "Male"
            }`)
        return;
    }

    var newUser = new userModel({
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "phone": req.body.phone,
        "nationality":req.body.nationality,
        "userId":req.body.userId,
        "gender": req.body.gender,
    })

    newUser.save((err, data) => {
        if (!err) {
            res.send("user created")
        } else {
            console.log(err);
            res.status(500).send("user create error, " + err)
        }
    });
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})