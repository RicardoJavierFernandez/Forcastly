const db = require('../models');

module.exports = {
    findAll: function(req, res) {
        db.Transactions.findAll({})
            .then((dbTransactions) => {
                res.json(dbTransactions);
            })
            .catch((err) => {
                res.status(422).json(err);
            })
    },
    findById: function(req, res) {
        db.Transactions.findOne({
            where: {
                transaction_id: req.params.id
            }
        })
        .then((dbTransactions) => {
            res.json(dbTransactions)
        })
        .catch((err) => {
            res.status(422).json(err);
        });
    },
    create: function(req, res) {
        db.sequelize.transaction(function(t) {
            return db.Transactions.create(
            {transaction_type_id: req.body.transaction_type_id}, 
            {transaction: t})
            .then((dbTransactions) => {
                return db.Orders.create({
                    product_id: req.body.product_id,
                    transaction_id: dbTransactions.transaction_id,
                    quantity: req.body.quantity,
                    price: req.body.price,
                    total: (req.body.quantity * req.body.price)
                }, {transaction: t});
            });
        })
        .then((result) => {
            console.log('Order submitted successfully!');
            res.json(result);
        })
        .catch((err) => {
            console.log('Error on transaction level.')
            res.status(422).json(err);
        });
    },
    update: function(req, res) {
        db.Transactions.update(req.body, {
            where: {
                transaction_id: req.params.id
            }
        })
        .then((dbTransactions) => {
            res.json(dbTransactions);
        })
        .catch((err) => {
            res.status(422).json(err);
        });
    },
    delete: function(req, res) {
        db.Transactions.destroy({
            where: {
                transaction_id: req.params.id
            }
        });
    }
}

