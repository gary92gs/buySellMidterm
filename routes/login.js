const express = require('express');
const router = express.Router();

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

// ALL ROUTES IN THIS FILE AND FILES IN /routes START AS /login (mounted route) - NO NEED TO ADD /login to server requests.
router.get('/:id', (req, res) => {
  const requestedId = parseInt(req.params.id);
  console.log('requestedID:', requestedId)
  let user;
  console.log('user is:', user, 'should be undefined');
  for (const userData of usersData) {
    if (userData.id === requestedId) {
      user = userData;
      console.log(userData);
    }
  }
  if (user) {
    res.cookie('user', user.username);
    return res.redirect('/');
  }
    return res.status(404).send('Please try again');
});


module.exports = router;