module.exports = function(sequelize, DataTypes) {
    const Orders = sequelize.define('Orders', {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        transaction_id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        timestamps: false
    });

    return Orders;
}

