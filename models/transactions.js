module.exports = function(sequelize, DataTypes) {
    const TIMESTAMP = require('sequelize-mysql-timestamp')(sequelize);
    const Transactions = sequelize.define('Transactions', {
        transaction_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        transaction_date: {
            type: TIMESTAMP,
            defaultValue: DataTypes.NOW
        },
    },
    {
        timestamps: false
    });

     // Create many-to-many relationship with Products model. Creates a join table name Orders.
    Transactions.associate = function(models) {
        Transactions.belongsToMany(models.Products, {
            through: {
                model: models.Orders,
                unique: false
            },
            foreignKey: 'transaction_id',
            constraints: true
        });
    }

    return Transactions;
}