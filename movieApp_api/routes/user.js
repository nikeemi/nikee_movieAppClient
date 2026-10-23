const express = require('express');
const userController = require('../controllers/user');
const { verify} = require("../auth");

const router = express.Router();

router.post("/register", userController.userRegistration);

router.post("/login", userController.userAuthentication);

router.get("/details", verify, userController.retrieveUser);

module.exports = router;