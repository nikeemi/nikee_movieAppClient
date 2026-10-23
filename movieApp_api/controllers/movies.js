const Movie = require('../models/Movies');
const { errorHandler } = require("../auth");


module.exports.addMovie = (req, res) => {

    let newMovie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        description: req.body.description,
        genre: req.body.genre
    });

    return newMovie.save()
    .then(result => res.status(201).send(result))
    .catch(error => errorHandler(error, req, res));
};

module.exports.getMovies = (req, res) => {

    return Movie.find({})
    .then(movies => {

        if(movies.length === 0) {
            return res.status(404).send({
                message: "No Movie found."
            });
        }

        return res.status(200).send({ movies: movies });
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.getMovie = (req, res) => {

    return Movie.findById(req.params.movieId)
    .then(movie => {

        if(!movie) {
            return res.status(404).send({
                message: "Movie not found"
            });
        }

        return res.status(200).send(movie);
    })
    .catch(error => errorHandler(error, req, res));
};
