const express = require('express');
const router = express.Router();

const listingsData = [
  { id: 1, title: 'Listing 1', description: 'Description for listing 1' },
  { id: 2, title: 'Listing 2', description: 'Description for listing 2' },
  { id: 3, title: 'Listing 3', description: 'Description for listing 3' }
];

router.get('/:id', (req, res) => {
  const requestedId = parseInt(req.params.id);
  console.log('This is the List ID:', requestedId);
  let uniqueListing;
  console.log('user is:', uniqueListing, 'should be undefined');
  for (const listing of listingsData) {
    console.log('Current listing ID:', listing.id);
    if (listing.id === requestedId) {
     uniqueListing = listing;
     break;
    }
  }
  console.log('This is the unique listing:', uniqueListing);
  if (!uniqueListing) {
    return res.status(404).send('Listing not found');
  }
  res.json(uniqueListing);
});

module.exports = router;