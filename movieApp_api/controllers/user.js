const User = require('../models/User');
const bcrypt = require("bcryptjs");
const auth = require("../auth.js");
const { errorHandler } = require("../auth");

module.exports.userRegistration = (req, res) => {

    if (typeof req.body.email !== "string" || !req.body.email.includes("@")){
        return res.status(400).send({ message: "Email invalid"});
    }
    else if (typeof req.body.password !== "string" || req.body.password.length < 8) {
        return res.status(400).send({ 
            message: "Password must contain at least 8 characters"
        });

    } else {
        let newUser = new User({
            
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password, 10)
        })

        return newUser.save()
        .then((result) => res.status(201).send({
            message: "Registered Successfully"
        }))
        .catch(error => errorHandler(error, req, res));
    }
};


module.exports.userAuthentication = (req, res) => {

    if (typeof req.body.email !== "string" || !req.body.email.includes("@") || typeof req.body.password !== "string") {

        return res.status(400).send({message: "Input is invalid"});
    }

    return User.findOne({
        email: req.body.email
    })
    .then(result => {

        if (result == null) {

            return res.status(404).send({message: "Email does not exist"});
        }

        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            result.password
        );

        if (!isPasswordCorrect) {

            return res.status(401).send({message: "Password is incorrect"});
        }

        return res.status(200).send({
            access: auth.createAccessToken(result)
        });

    })
    .catch(error => errorHandler(error, req, res));
};


module.exports.retrieveUser = (req, res) => {

    return User.findById(req.user.id)
    .then(result => {

        if(result == null) {

            return res.status(404).send({ 
                message: "User cannot be found"
            });
        }
        result.password = undefined;
        return res.status(200).send(result);
    })
    .catch(error => errorHandler(error, req, res));
};



