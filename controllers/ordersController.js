const db = require('../models');

module.exports = {
    findAll: function(req, res) {
        db.sequelize.query(
            `SELECT 
                tt.transaction_type,
                date_format(t.transaction_date, '%m/%d/%Y %H:%i:%s') as transaction_date,
                p.product_name,
                o.price,
                o.quantity,
                o.total
            FROM c1e4qrnv2l9sfpm7.Orders o
            LEFT JOIN c1e4qrnv2l9sfpm7.Transactions t
                on o.transaction_id = t.transaction_id
            LEFT JOIN c1e4qrnv2l9sfpm7.Products p
                on p.product_id = o.product_id
            LEFT JOIN c1e4qrnv2l9sfpm7.TransactionTypes tt
                on t.transaction_type_id = tt.transaction_type_id
            ORDER BY t.transaction_id;`
            ) 
            .then((dbOrders) => {
                res.json(dbOrders); 
            }) 
            .catch((err) => {
                res.status(422).json(err);
            });
    },
    findById: function(req, res) {
        db.Orders.findOne({
            where: {
                product_id: req.body.product_id,
                transaction_id: req.body.transaction_id
            }
        })
        .then((dbOrders) => {
            res.json(dbOrders);
        })
        .catch((err) => {
            res.status(422).json(err);
        });
    }
}