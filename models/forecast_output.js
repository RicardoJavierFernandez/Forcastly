module.exports = function(sequelize, DataTypes) {
    const TIMESTAMP = require('sequelize-mysql-timestamp')(sequelize);
    const ForecastOutput = sequelize.define('ForecastOutput', {
        forecast_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        forecast_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        forecast_date: {
            type: TIMESTAMP,
            defaultValue: DataTypes.NOW
        }
    },
    {
        timestamps: false
    });

    return ForecastOutput;
}