const db = require('../models');

module.exports = {
    findAll: function(req, res) {
        db.ForecastAssumptions.findAll({})
            .then((dbForecastAssumptions) => {
                res.json(dbForecastAssumptions)
            })
            .catch((err) => {
                res.status(422).json(err);
            });
    },
    findById: function(req, res) {
        db.ForecastAssumptions.findOne({
            where: {
                assumption_id: req.params.id
            }
        })
        .then((dbForecastAssumptions) => {
            res.json(dbForecastAssumptions)
        })
        .catch((err) => {
            res.status(422).json(err);
            });
    },
    create: function(req, res) {
        db.ForecastAssumptions.create(req.body)
            .then((dbForecastAssumptions) => {
                res.json(dbForecastAssumptions);
            })
            .catch((err) => {
                res.status(422).json(err);
            });
    },
    update: function(req, res) {
        db.ForecastAssumptions.update(req.body, {
            where: {
                assumption_id: req.params.id
            }
        })
        .then((dbForecastAssumptions) => {
            res.json(dbForecastAssumptions);
        })
        .catch((err) => {
            res.status(422).json(err);
        })
    },
    delete: function(req, res) {
        db.ForecastAssumptions.destroy({
            where: {
                assumption_id: req.params.id
            }
        });
    }
}