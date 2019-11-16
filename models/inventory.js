module.exports = function(sequelize, DataTypes) {
    const Inventory = sequelize.define('Inventory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false 
        }
        },
        {
            timestamps: false,
            freezeTableName: true

        });
        return Inventory;
};