const express = require('express');
const router  = express.Router();

// uncomment when db is live
// const db = require('../connection');

router.get('/', (req, res) => {
  return res.status(200).send('You should be seeing this');
});

// router.get('/', (req, res) => {
  
//   res.render('tbd');
// });

// router.post('/', (req, res) => {
//   const {
//     ownerID,
//     title,
//     description,
//     price_cents,
//     street_address,
//     city,
//     country,
//     postal_code,
//     status
//   } = req.body;

//   db.query(`
//     INSERT INTO listings (owner_id, title, description, price_cents, street_address, city, country, postal_code, status)
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//     RETURNING id;`,
//   [ownerID, title, description, price_cents, street_address, city, country, postal_code, status])
//     .then((result) => {
//       const newListingId = result.rows[0].id;
//       return res.redirect(`/show/${newListingId}`);
//     })
//     .catch((error) => {
//       console.error('Error adding new listing:', error);
//       // return res.status(500).send('Internal Server Error');
//     });
// });

module.exports = router;