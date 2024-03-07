const express = require('express');
const router = express.Router();
const dbFavourites = require('../db/queries/favouritesQueries');
const db = require('../db/connection');

// GET
router.get('/', (req, res) => {
  const userId = req.cookies.userId;
  
  if(!userId) {
    return res.status(400).send('Please Login to view Favourites');
  }

  const filterObj = {
    priceCentsMin: Number(req.cookies.priceMin + '00'),
    priceCentsMax: Number(req.cookies.priceMax + '00'),
    userSearch: req.cookies.userSearch,
    city: req.cookies.city,
    province: req.cookies.province,
    country: req.cookies.country,
  };

  dbFavourites
  .browseFavourites(userId)
  .then((favouriteListingsArr) => {
    console.log(favouriteListingsArr);
    return res.render('favourites', { filterObj, favouriteListingsArr });
  })
  .catch(error => {
    console.error('Error browsing favourites:', error);
    return res.status(500).send('Internal Server Error');
  })
})

// DELETE
router.delete('/delete', function(req, res) {
  const listingId = req.body.listingId;

  dbFavourites
  .removeFavourite(listingId)
    .then((removedListing) => {
      return res.status(200).send(`Successfully deleted ${removedListing} favorite(s)`);
    })
    .catch((error) => {
      console.error('Error removing favorite:', error);
      return res.status(500).send('Failed to remove favorite');
    });
});

// POST
router.post('/add', function(req, res) {
  const userId = req.cookies.userId;
  const listingId = req.body.listingId;

  if (!userId) {
    return res.status(400).send('Please Login to add to Favourites');
  }
  dbFavourites
  .addFavourite(userId, listingId)
    .then(() => res.status(200).send('Successfully added to Favourites'))
    .catch((error) => {
      if (error.message === 'Invalid listing ID') {
        return res.status(400).send('Invalid listing ID');
      }
      if (error.message === 'Listing already in favorites') {
        return res.status(400).send('Listing already in favorites');
      }
      console.error('Error adding favourite:', error);
      return res.status(500).send('Failed to add to Favourites');
    });
});

module.exports = router;