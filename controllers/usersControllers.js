const db = require('../models');
const md5 = require("md5");

const getSession = (account) => {
    return {
        id: account.user_id,
        name: account.name,
        token: md5(account.email + new Date())
    }
}

module.exports = {
    findByEmail: function(req, res) {
        db.Users.findOne({
            where: {
                email: req.body.email
            }
        })
        .then((dbUser) => {
            if(dbUser) {
                res.json({'message': 'Successfully logged in!'});
            }
            else {
                res.json({'message': 'Email does not exist, please use a valid email. or sign up.'});
            }
        })
        .catch((err) => {
            res.status(422).json(err);
            });
    },
    create: function(req, res) {
        let account = req.body;
        account.email = req.body.email.toLowerCase();
        account.password = md5(req.body.password);
        
        db.Users.create(account)
            .then(() => {
                res.json({'message': 'You successfully registered'});
            })
            .catch((err) => {
                res.status(422).json(err);
            });
    },
    update: function(req, res) {
        db.Users.update(req.body, {
            where: {
                email: req.body.email
            }
        })
        .then((dbUsers) => {
            res.json(dbUsers);
        })
        .catch((err) => {
            res.status(422).json(err);
        });
    },
    login: function(req, res) {
        db.Users.findOne({
            where: {
                email: req.body.email.toLowerCase()
            }
        })
        .then((dbUsers) => {
            if (dbUsers.password == md5(req.body.password)) {
                res.json(getSession(dbUsers));
            }
            else { 
                res.sendStatus(401);
            }
        }) 
        .catch((err) => {
            res.status(422).json(err);
        }); 
    }
}