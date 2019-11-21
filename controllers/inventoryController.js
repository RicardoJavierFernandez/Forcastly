const db = require('../models');

module.exports = {
    findAll: function(req, res) {
        db.sequelize.query(`
                USE c1e4qrnv2l9sfpm7;
                SELECT 
                    p.product_sku,
                    p.product_name,
                    sum(case tt.transaction_type_id
                        when 1 then o.quantity
                        when 2 then -o.quantity
                        when 3 then o.quantity
                    end) quantity
                FROM Orders o
                LEFT JOIN Transactions t
                    on o.transaction_id = t.transaction_id
                LEFT JOIN Products p
                    on p.product_id = o.product_id
                LEFT JOIN TransactionTypes tt
                    on t.transaction_type_id = tt.transaction_type_id
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