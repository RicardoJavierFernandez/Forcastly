const db = require('../models');

module.exports = {
    findAll: function(req, res) {
        db.sequelize.query(`
                SELECT 
                    p.product_sku,
                    p.product_name,
                    SUM(CASE tt.transaction_type_id
                        WHEN 1 THEN o.quantity
                        WHEN 2 THEN -o.quantity
                        WHEN 3 THEN o.quantity
                    END) quantity
                FROM forcastly.Orders o
                LEFT JOIN forcastly.Transactions t
                    ON o.transaction_id = t.transaction_id
                LEFT JOIN forcastly.Products p
                    ON p.product_id = o.product_id
                LEFT JOIN forcastly.TransactionTypes tt
                    ON t.transaction_type_id = tt.transaction_type_id
                GROUP BY p.product_name, product_sku
                ORDER BY quantity DESC;`
            )
            .then((dbInventory) => {
                res.json(dbInventory)
            })
            .catch((err) => {
                res.status(422).json(err);
            });
    },
    findById: function(req, res) {
        db.Inventory.findOne({
            where: {
                product_id: req.params.id
            }
        })
        .then((dbInventory) => {
            res.json(dbInventory)
        })
        .catch((err) => {
            res.status(422).json(err);
            });
    },
    create: function(req, res) {
        db.Inventory.create(req.body)
            .then((dbInventory) => {
                res.json(dbInventory);
            })
            .catch((err) => {
                res.status(422).json(err);
            });
    },
    update: function(req, res) {
        db.Inventory.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then((dbInventory) => {
            res.json(dbInventory);
        })
        .catch((err) => {
            res.status(422).json(err);
        })
    },
    delete: function(req, res) {
        db.Inventory.destroy({
            where: {
                id: req.params.id
            }
        });
    }
}