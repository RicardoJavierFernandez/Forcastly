const db = require('../models');

module.exports = {
    findAll: function(req, res) {
        db.TransactionTypes.findAll({})
            .then((dbTransactionTypes) => {
                res.json(dbTransactionTypes);
            })
            .catch((err) => {
                res.status(422).json(err);
            })
    },
    findById: function(req, res) {
        db.TransactionTypes.findOne({
            where: {
                transaction_type_id: req.params.id
            }
        })
        .then((dbTransactionTypes) => {
            res.json(dbTransactionTypes)
        })
        .catch((err) => {
            res.status(422).json(err);
        });
    },
    create: function(req, res) {
        db.TransactionTypes.create(req.body)
            .then((dbTransactionTypes) => {
                res.json(dbTransactionTypes);
            })
            .catch((err) => {
                res.status(422).json(err);
            });
    },
    update: function(req, res) {
        db.TransactionTypes.update(req.body, {
            where: {
                transaction_type_id: req.params.id
            }
        })
        .then((dbTransactionTypes) => {
            res.json(dbTransactionTypes);
        })
        .catch((err) => {
            res.status(422).json(err);
        });
    },
    delete: function(req, res) {
        db.TransactionTypes.destroy({
            where: {
                transaction_type_id: req.params.id
            }
        });
    }
}