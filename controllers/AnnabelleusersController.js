const db = require("../models");
const md5= require("md5");

const getSession=(acount)=>{
return {
    id:account_id,
    name:account.name,
    token:md5(account.email+account.date)
}

}
console.log("md5 of Name",md5("Name"))

// Defining methods for the bController
module.exports = {
  findAll: function(req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  login:function(req, res)
  {
    db.User
    .findone(
    {email:req.body.email.toLowerCase()})
 .then(dbModel => {
        if (dbModel.password==md5
            (req.body.password))
        {
            res.json(getSession(dbModel))
        }
        else
        res.sendStatus(401)
 })
    .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {
      let account= req.body.email;
      account.email=req.body.toLowerCase ();
      account.password=md5
    // md5 in video is yellow mine is blue
      (req.body.password);
    db.User
      .create(account)
      .then(dbModel => res.json 
        (getSession(dbModel)))
      .catch(err => res.status(422)
      .json(err));
  },
  update: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
