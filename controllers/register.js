const bcrypt = require("bcrypt");
const User = require("../model/usersModel");
const multiparty = require('multiparty');

const addUser = (req, res) => {
    let userObj = new Object();
    let form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        console.log(fields);
        Object.entries(fields).forEach(function ([name, value]) {
            userObj[name] = value.toString();
        });
        console.log(userObj);

        // hash the password
        bcrypt
            .hash(userObj.password, 10)
            .then((hashedPassword) => {
                // create a new user instance and collect the data
                const user = new User({
                    email: userObj.email,
                    password: hashedPassword,
                });

                // save the new user
                user
                    .save()
                    // return success if the new user is added to the database successfully
                    .then((result) => {
                        res.status(201).send({
                            message: "User Created Successfully",
                            result,
                        });
                    })
                    // catch erroe if the new user wasn't added successfully to the database
                    .catch((error) => {
                        res.status(500).send({
                            message: "Error creating user",
                            error,
                        });
                    });
            })
            // catch error if the password hash isn't successful
            .catch((e) => {
                res.status(500).send({
                    message: "Password was not hashed successfully",
                    e,
                });
            });


    });

};

module.exports = { addUser }