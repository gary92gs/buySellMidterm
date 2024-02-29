const express = require('express');
const router = express.Router();

const listingsData = [
  { id: 1, title: 'Listing 1', description: 'Description for listing 1' },
  { id: 2, title: 'Listing 2', description: 'Description for listing 2' },
  { id: 3, title: 'Listing 3', description: 'Description for listing 3' }
];

router.get('/', (req, res) => {
  // Send json for listingsData
  res.json(listingsData);
});

module.exports = router;