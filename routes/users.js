var express = require('express');
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth.js");
var router = express.Router();
const User = require("../src/database/User.js");

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

/* GET users listing. */
router.get('/all', function(req, res, next) {
  User.find({})
    .then(function(dbuser){
      res.json(dbuser);
    })  
    .catch(function(err){
      res.json(err);
    })
});

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  User.findById({_id: req.params.id})
    .then(function(data){
      res.json(data);
    })
    .catch(function(err){
      res.json(err);
    })
});

/* DELETE users listing. */
router.delete('/:id', function(req, res, next) {
  User.deleteOne({_id: req.params.id})
    .then(function(data){
      res.json(data);
    })
    .catch(function(err){
      res.json(err);
    })
});

/* UPDATE users listing. */
router.put('/:id', function(req, res, next) {
  User.deleteOne({_id: req.params.id})
    .then(function(data){
      res.json(data);
    })
    .catch(function(err){
      res.json(err);
    })
});

/* POST users listing. */
router.post("/register", async (req, res) => {
  //find an existing user
  let user = await User.findOne({ email: req.body.email }).exec();
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    username: user.username,
    email: user.email,
    token: token,
    isAdmin: user.isAdmin,
  });
});

/* POST users Login. */
router.post('/login', async function(req, res, next) {

  let user = await User.findOne({ email: req.body.email }).exec();
  if(user){
    if(bcrypt.compareSync(req.body.password, user.password) ) {
      const token = user.generateAuthToken();

      res.header("x-auth-token", token).send({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: token,
        isAdmin: user.isAdmin,

      });
    }
    else{
      res.json({msg: "password not match"});
    }
  }else{
    res.json({
      msg: "user not found"
    })
  }
});

module.exports = router;
