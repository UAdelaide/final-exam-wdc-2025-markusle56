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
      `SELECT
        d.name AS dog_name,
        d.size,
        u.username AS owner_username
      FROM Dogs d
      JOIN Users u
        ON d.owner_id = u.user_id`
    );
    return res.status(200).json(rows);
  } catch(err) {
    console.error("Error geting dogs data");
    return res.sendStatus(500);
  }
});

router.get('/api/dogs', async function(req, res) {
  try {
    const [rows] = await db.query(
      `SELECT
        d.name AS dog_name,
        d.size,
        u.username AS owner_username
      FROM Dogs d
      JOIN Users u
        ON d.owner_id = u.user_id`
    );
    return res.status(200).json(rows);
  } catch(err) {
    console.error("Error geting dogs data");
    return res.sendStatus(500);
  }
});
module.exports = router;
