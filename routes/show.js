const express = require('express');
const router = express.Router();

// uncomment when db is live
// const db = require('../connection');

const listingsData = [
  { id: 1, title: 'Listing 1', description: 'Description for listing 1' },
  { id: 2, title: 'Listing 2', description: 'Description for listing 2' },
  { id: 3, title: 'Listing 3', description: 'Description for listing 3' }
];

router.get('/:id', (req, res) => {
  const requestedId = parseInt(req.params.id);
  let uniqueListing;
  for (const listing of listingsData) {
    console.log('Current listing ID:', listing.id);
    if (listing.id === requestedId) {
      uniqueListing = listing;
      break;
    }
  }
  if (!uniqueListing) {
    return res.status(404).send('Listing not found');
  }
  res.json(uniqueListing);
});

// test when db goes live

// router.get('/:id', (req, res) => {
//   const requestedId = parseInt(req.params.id);
//   db.query('SELECT * FROM listings WHERE id = $1', [requestedId])
//     .then((result) => {
//       if (result.rows.length > 0) {
//         const uniqueListing = result.rows[0];
//         return res.render('tbd', { listing: uniqueListing });
//       }
//       console.log('Listing not found');
//       return res.status(404).send("Please try again")
//     })
//     .catch((error) => {
//       console.error('Error fetching listing:', error);
//       return res.status(500).send("Internal Server Error")
//     });
// });


module.exports = router;