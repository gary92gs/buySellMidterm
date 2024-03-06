const express = require('express');
const router = express.Router();

const dbFavourites = require('../db/queries/favouritesQueries')

// const listingsData = [
//   { id: 1, title: 'Listing 1', description: 'Description for listing 1' },
//   { id: 2, title: 'Listing 2', description: 'Description for listing 2' },
//   { id: 3, title: 'Listing 3', description: 'Description for listing 3' }
// ];

// const usersData = [
//   {
//     username: 'user1',
//     id: 1,
//     email: 'user1@example.com',
//     password: 'password123'
//   },
//   {
//     username: 'user2',
//     id: 2,
//     email: 'user2@example.com',
//     password: 'password456'
//   },
//   {
//     username: 'user3',
//     id: 3,
//     email: 'user3@example.com',
//     password: 'password789'
//   }
// ];

// const favouritesData = [
//   { id: 1, userID: 1, listingID: 2 },
//   { id: 2, userID: 2, listingID: 3 },
//   { id: 3, userID: 3, listingID: 1 }
// ];

// router.get('/', (req, res) => {
//   const loggedInUser = req.cookies && req.cookies.user;

//   if (!loggedInUser) {
//     return res.status(401).send("Unauthorized: You need to have an account to view your favourites");
//   }

//   let user = null;
//   for (const userData of usersData) {
//     if (userData.username === loggedInUser) {
//       user = userData;
//       break;
//     }
//   }
//   if (!user) {
//     return res.status(404).send("User not found");
//   }

//   const userId = user.id;

//   const userFavorites = [];
//   for (const favorite of favouritesData) {
//     if (favorite.userID === userId) {
//       let listing = listingsData.find(listingData => listingData.id === favorite.listingID);
//       if (listing) {
//         userFavorites.push({ id: favorite.id, listing });
//       }
//     }
//   }
//   return res.send(userFavorites);
// });

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
    res.render('favourites', { filterObj, favouriteListingsArr });
  })
  .catch(error => {
    console.error('Error browsing favourites:', error);
    res.status(500).send('Internal Server Error');
  })
})

router.delete('/delete', function(req, res) {
  const listingId = req.body.listingId;
console.log('request body:', req.body)
  dbFavourites
  .removeFavourite(listingId)
    .then((removedListing) => {
      res.status(200).send(`Successfully deleted ${removedListing} favorite(s)`);
    })
    .catch((error) => {
      console.error('Error removing favorite:', error);
      res.status(500).send('Failed to remove favorite');
    });
});

module.exports = router;
