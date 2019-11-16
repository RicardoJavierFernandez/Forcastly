module.exports = function(sequelize, DataTypes) {
    const TIMESTAMP = require('sequelize-mysql-timestamp')(sequelize);
    const OrderHistoryUploads = sequelize.define('OrderHistoryUploads', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        asin: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        item_price: {
            type: DataTypes.DECIMAL(10, 2)
        },
        uploadDate: {
            type: TIMESTAMP,
            defaultValue: DataTypes.NOW
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    });

    return OrderHistoryUploads;
}