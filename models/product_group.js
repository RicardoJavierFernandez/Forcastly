module.exports = function(sequelize, DataTypes) {
    const ProductGroups = sequelize.define('ProductGroups', {
        product_group_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        group_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    });

    ProductGroups.associate = function(models) {
        ProductGroups.hasMany(models.Products, {
            foreignKey: 'product_group_id'
        });
    };

    return ProductGroups;
}