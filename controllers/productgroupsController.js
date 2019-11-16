const db = require('../models');

module.exports = {
    findAll: function(req, res) {
        db.ProductGroups.findAll({})
            .then((dbProductGroups) => {
                res.json(dbProductGroups)
            })
            .catch((err) => {
                res.status(422).json(err);
            });
    },
    findById: function(req, res) {
        db.ProductGroups.findOne({
            where: {
                product_group_id: req.params.id
            }
        })
        .then((dbProductGroups) => {
            res.json(dbProductGroups)
        })
        .catch((err) => {
            res.status(422).json(err);
            });
    },
    create: function(req, res) {
        db.ProductGroups.create(req.body)
            .then((dbProductGroups) => {
                res.json(dbProductGroups);
            })
            .catch((err) => {
                res.status(422).json(err);
            });
    },
    update: function(req, res) {
        db.ProductGroups.update(req.body, {
            where: {
                product_group_id: req.params.id
            }
        })
        .then((dbProductGroups) => {
            res.json(dbProductGroups);
        })
        .catch((err) => {
            res.status(422).json(err);
        })
    },
    delete: function(req, res) {
        db.ProductGroups.destroy({
            where: {
                product_group_id: req.params.id
            }
        });
    }
}