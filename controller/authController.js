const authModel = require('../model/authModel.js');
const { hashPassword, comparePassword } = require('../helper/passwordHash.js');
const jwt = require("jsonwebtoken");

async function signupController(req, res) {
    try {
        if (!req.body.name || !req.body.email || !req.body.password || !req.body.dob || !req.body.address) {
            return res.send({
                success: false,
                error: "All fields are required"
            });
        }

        const find = await authModel.findOne({ email: req.body.email });
        if(find){
            return res.send({
                success: false,
                error: "Email already exist do login"
            });
        }

        const newpass = await hashPassword(req.body.password);
        const result = await authModel.create({
            name: req.body.name,
            email: req.body.email,
            password: newpass,
            address: req.body.address,
            dob: req.body.dob
        });

        const token = jwt.sign({ _id: result._id }, 'SecretKey', { expiresIn: '7d' })

        if (result) {
            return res.send({
                success: true,
                message: "Registration successfull",
                result,
                token
            });
        }
        else {
            return res.send({
                success: false,
                error: "Error in query"
            })
        }
    }
    catch (err) {
        console.log("Controller error: ", err);
        return res.send("Internal server error");
    }
}

async function signinController(req, res) {
    try {
        if (!req.body.email || !req.body.password) {
            return res.send({
                success: false,
                error: "All fields are required"
            });
        }

        const search = await authModel.findOne({ email: req.body.email });

        if (!search) {
            return res.send({
                success: false,
                error: "Email not found"
            });
        }

        const match = await comparePassword(req.body.password, search.password);

        if (!match) {
            return res.send({
                success: false,
                error: "Passwords do not match"
            });
        }

        const token = jwt.sign({ _id: search._id }, 'SecretKey', { expiresIn: '7d' });

        return res.send({
            success: true,
            message: "Login successfull",
            result: search,
            token
        });
    }
    catch (err) {
        console.log("Controller error: ", err);
        return res.send("Internal server error");
    }
}

async function getDataController(req, res) {
    try {
        const search = await authModel.findOne({ email: req.body.email });

        if (!search) {
            return res.send({
                success: false,
                error: "Email not found"
            });
        }

        const result = await authModel.find({});

        if (result) {
            return res.send({
                success: true,
                result
            });
        }
        else {
            return res.send({
                success: false,
                error: "No data yet"
            });
        }
    }
    catch (err) {
        console.log("Controller error: ", err);
        return res.send("Internal server error");
    }
}

module.exports = { signupController, signinController, getDataController };