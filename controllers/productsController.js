const db = require('../models');

module.exports = {
    findAll: function(req, res) {
        db.Products.findAll({})
            .then((dbProducts) => {
                res.json(dbProducts)
            })
            .catch((err) => {
                res.status(422).json(err);
            });
    },
    findById: function(req, res) {
        db.Products.findOne({
            where: {
                product_id: req.params.id
            }
        })
        .then((dbProduct) => {
            res.json(dbProduct)
        })
        .catch((err) => {
            res.status(422).json(err);
            });
    },
    create: function(req, res) {
        db.Products.create(req.body)
            .then((dbProduct) => {
                res.json(dbProduct);
            })
            .catch((err) => {
                res.status(422).json(err);
            });
    },
    createMany: function(req, res) {
        db.Products.bulkCreate(req.body)
            .then((dbProducts) => {
                res.json(dbProducts);
            })
            .catch((err) => {
                res.status(422).json(err);
            });
    },
    update: function(req, res) {
        db.Products.update(req.body, {
            where: {
                product_id: req.params.id
            }
        })
        .then((dbProduct) => {
            res.json(dbProduct);
        })
        .catch((err) => {
            res.status(422).json(err);
        })
    },
    delete: function(req, res) {
        db.Products.destroy({
            where: {
                product_id: req.params.id
            }
        });
    }
}