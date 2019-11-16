// Write the code for the model and write the data
// to the ForecastOutput table in the database

function forecastOutput(unitsOrder, totalOrder, masterCarton) {
        
    let orderAmount = 0;
    let leadTime = 0; // represented in days
    let growthPercentage = 0;

    // input1 = 0.8
    if (totalOrder / unitsOrder >= 0.8) {
        orderAmount = unitsOrder;
    }
    // input2 = 0.25
    else if (totalOrder / unitsOrder < 0.25) {
        orderAmount = unitsOrder * 0.5;
    }
    // input3 = 0.49
    else if (totalOrder / unitsOrder <= 0.49) {
        orderAmount = unitsOrder * 0.7;
    }
    // input4 = 0.79
    else if(totalOrder / unitsOrder <= 0.79) {
        orderAmount = unitsOrder * 0.88;
    }

    // Adjustment for master carton. Should return number of master cartons to order
    if (((orderAmount % masterCarton) / masterCarton) >= 0.5) {
        return Math.round(orderAmount / masterCarton, 0);
    }
    else {
        return Math.floor(orderAmount / masterCarton)
    }
    
    // Whatever product is selected for the forecast, query the database for the quantity of that product
    // and if the quantity from the forecast is greater than the quantity in the database
    // then subtract the forecast output by the quantity in the database.

}

module.exports = { forecastOutput };
