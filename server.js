require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var syncOptions = { force: false }; // change to true if we want to override the current database

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    syncOptions.force = true;
}
 
app.use(routes);

db.sequelize.sync(syncOptions).then(() => {
    app.listen(PORT, () => {
        console.log(`🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
    });
});
