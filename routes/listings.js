const express = require('express');
const router = express.Router();
// uncomment when db connected
// const db = require('../connection');

const listingsData = [
  { id: 1, title: 'Listing 1', description: 'Description for listing 1' },
  { id: 2, title: 'Listing 2', description: 'Description for listing 2' },
  { id: 3, title: 'Listing 3', description: 'Description for listing 3' }
];

router.get('/', (req, res) => {
  // Send JSON for listingsData
  res.json(listingsData);
});

// test when connected

// router.get('/'), (req, res) => {
//   db.query(`SELECT *
//   FROM listings`)
//   .then((results) => {
//     listingsData = results.rows;
//     return res.render('listings', { listingsData });
//   })
//   .catch((error) => {
//     console.log(error) 
//     return res.status(500).send("Internal Server Error")
//   })
// }

module.exports = router;