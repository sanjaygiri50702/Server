var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , page : 'home'});
});

/* GET Register Page. */
router.get('/register', (req,res)=>{
  res.render('index', {title: 'Registration', page: 'register'});
})

module.exports = router;
