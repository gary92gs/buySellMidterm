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
  
});

module.exports = router;