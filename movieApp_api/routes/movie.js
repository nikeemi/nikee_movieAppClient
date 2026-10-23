const express = require('express');
const movieController = require('../controllers/movies');
const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

router.post("/addMovie", verify, verifyAdmin, movieController.addMovie);

router.get("/getMovies", verify, movieController.getMovies);

router.get("/getMovie/:movieId", verify, movieController.getMovie);

module.exports = router;
