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
      `SELECT d.dog AS dog_name, d.size, u.username AS owner_username
      FROM Dogs d
      INNER JOIN Users u
      ON d.owner_id = u.user_id`
    )
    return res.send
  } catch(err) {
    console.error("Error geting dogs data")
  }
})
module.exports = router;
