var express = require('express');
const bcrypt = require("bcrypt");
var router = express.Router();
const Event = require("../src/database/Event.js");

/* POST users listing. */
router.get("/", async (req, res) => {
    //find an existing user
    Event.find({}).sort({createdAt: 'descending'}).exec(function(err, docs){
      if(err){
        res.json(err);
      }else{
        res.json(docs);
      }
    })
  });

/* POST users listing. */
router.get("/trending", async (req, res) => {
    //find an existing user
    Event.find({})
    .then(function(dbuser){
      res.json(dbuser);
    })  
    .catch(function(err){
      res.json(err);
    })
  });
  

/* POST users listing. */
router.get("/explore", async (req, res) => {
    //find an existing user
    Event.find({})
    .then(function(dbuser){
      res.json(dbuser);
    })  
    .catch(function(err){
      res.json(err);
    })
  });
  

/* POST users listing. */
router.get("/", async (req, res) => {
  Event.findById({_id: req.params.id})
    .then(function(data){
      res.json(data);
    })
    .catch(function(err){
      res.json(err);
    })
  });
  
/* POST users listing. */
router.post("/", async (req, res) => {
  console.log(req.body)
  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    email: req.body.email,
    startDate: req.body.startDate,
    location: req.body.location,
    endDate: req.body.endDate,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    host: req.body.host,
  });
  event.save(function(err,result){ 
    if (err){ 
      res.json(err); 
    } 
    else{ 
      res.json(result);
    } 
}) 
});
  
module.exports = router;
