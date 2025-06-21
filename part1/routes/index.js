var express = require('express');
var router = express.Router();
const db = require('../db');

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
    console.error("Error getting dogs data");
    return res.sendStatus(500);
  }
});

router.get('/api/walkrequests/open', async function(req, res) {
  try {
    const [rows] = await db.query(
      `SELECT
        r.request_id,
        d.name AS dog_name,
        r.requested_time,
        r.duration_minutes,
        r.location,
        u.username AS owner_username
      FROM WalkRequests r
      JOIN Dogs d
        ON r.dog_id = d.dog_id
      JOIN Users u
        ON d.owner_id = u.user_id
      WHERE r.status = 'open'`
    );
    return res.status(200).json(rows);
  } catch(err) {
    console.error("Error getting walk request data");
    return res.sendStatus(500);
  }
});

router.get('/api/walkers/summary', async function(req, res) {
  try {
    const [rows] = await db.query(
      `SELECT
        u.username AS walker_username,
        COUNT(ra.walker_id) AS total_ratings,
        ROUND(AVG(ra.rating), 1) AS average_rating,
        (
          SELECT
          COUNT(*)
          FROM WalkApplications a
          JOIN WalkRequests re
           ON a.request_id = re.request_id
          WHERE a.walker_id = u.user_id
            AND a.status = 'accepted'
            AND re.status = 'completed'
        ) AS completed_walks
      FROM Users u
      LEFT JOIN WalkRatings ra
        ON u.user_id = ra.walker_id
      WHERE u.role = 'walker'
      GROUP BY ra.walker_id, u.username`
    );
    return res.status(200).json(rows);
  } catch(err) {
    console.error("Error getting walkers data");
    return res.sendStatus(500);
  }
});

module.exports = router;
