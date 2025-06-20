var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/dogs', async function(req, res) {
  try {
    const [rows] = await db.query(
      `SELEcT `
    )
  } catch(err) {
    console.error("Error geting dogs data")
  }
})
module.exports = router;
