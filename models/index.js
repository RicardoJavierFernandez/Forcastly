'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
let db = {};


// Output will read the information from the .env file if it exists and initialize new Sequelize intance
if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
}
// Or it will initialize a Sequelize instance with the database information in the config/config.json file.
else {
    var sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config, {
            dialectOptions: {
                useUTC: false, //for reading from database
                dateStrings: true,
                typeCast: function (field, next) { // for reading from database
                  if (field.type === 'DATETIME') {
                    return field.string()
                  }
                    return next()
                  },
              }
        }
)} 

// __dirname is equal to ModelSetup/models
// fs.readdirSync(__dirname) is equal to the names of the files in the models folder.
fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            // Filter out the file names that do not start with ".", does not equal the name of this file (index.js),
            // and that the last three characters end with ".js"
            file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
        );
    })
    .forEach((file) => {
        // the "file" parameter is the array of files that met the criteria above. 
        // import the sequelize model by name in each file. The name of the model is what is found in models file's 
        // sequelize.define('Table_Name',{})
        let model = sequelize.import(path.join(__dirname, file));
        // assign the sequelize model (value) to the name of the model (key) in the db object.
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    // check to see if the sequelize model has an associate method, 
    // and if it does then envoke the method passing in the db object as a parameter
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
