const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());

const listingsData = [
  { id: 1, title: 'Listing 1', description: 'Description for listing 1' },
  { id: 2, title: 'Listing 2', description: 'Description for listing 2' },
  { id: 3, title: 'Listing 3', description: 'Description for listing 3' }
];

const usersData = [
  {
    username: 'user1',
    id: 1,
    email: 'user1@example.com',
    password: 'password123'
  },
  {
    username: 'user2',
    id: 2,
    email: 'user2@example.com',
    password: 'password456'
  },
  {
    username: 'user3',
    id: 3,
    email: 'user3@example.com',
    password: 'password789'
  }
];

const favouritesData = [
  { id: 1, user_id: 1, listing_id: 2 },
  { id: 2, user_id: 2, listing_id: 3 },
  { id: 3, user_id: 3, listing_id: 1 }
];

router.get('/', (req, res) => {
    const loggedInUser = req.cookies && req.cookies.user;
    console.log('This is the login cookie:', loggedInUser)
    if (!loggedInUser) {
      return res.status(401).send("Unauthorized: You need to have an account to view your favourites");
    }
    
    let user = null;
    for (const userData of usersData) {
      if (userData.username === loggedInUser) {
        user = userData;
        console.log('This is the user', user)
        break;
      }
    }
    if (!user) {
      return res.status(404).send("User not found");
    }
  
    const userId = user.id;
  
    const userFavorites = [];
    for (const favorite of favouritesData) {
      if (favorite.user_id === userId) {
        let listing = listingsData.find(listingData => listingData.id === favorite.listing_id);
        if (listing) {
          userFavorites.push({ id: favorite.id, listing });
        }
      }
    }
    return res.send(userFavorites);
  });

module.exports = router;