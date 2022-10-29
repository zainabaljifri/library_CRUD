const bcrypt = require("bcryptjs");
const User = require("../model/usersModel");
const multiparty = require('multiparty');
const jwt = require("jsonwebtoken");

const login = (req, res) => {
    let userObj = new Object();
    let form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        Object.entries(fields).forEach(function ([name, value]) {
            userObj[name] = value.toString();
        });
    // check if email exists
    User.findOne({ email: userObj.email })
        // if email exists
        .then((user) => {
            // compare the password entered and the hashed password found
            bcrypt.compare(userObj.password, user.password)
                // if the passwords match
                .then((passwordCheck) => {
                    // check if password matches
                    if (!passwordCheck) {
                        return res.status(400).send({
                            message: "Passwords does not match"
                        });
                    }
                    //   create JWT token
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            userEmail: user.email,
                        },
                        "RANDOM-TOKEN",
                        { expiresIn: "24h" }
                    );
                    //   return success response
                    res.status(200).send({
                        message: "Login Successful",
                        email: user.email,
                        token,
                    });
                })
                // catch error if password do not match
                .catch((error) => {
                    res.status(400).send({
                        message: "Passwords does not match"
                    });
                });
        })
        // catch error if email does not exist
        .catch((e) => {
            res.status(404).send({
                message: "Email not found"
            });
        });

    });
}

module.exports = { login }