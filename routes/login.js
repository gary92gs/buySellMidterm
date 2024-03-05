const express = require('express');
const router = express.Router();

const dbUsers = require('./../db/queries/userQueries');

// uncomment when db is live
// const db = require('../db/connection');

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


// router.get('/:id', (req, res) => {
//   //grab id from params to match with users.id query
//   const requestedId = parseInt(req.params.id);
//   let user;

//   for (const userData of usersData) {
//     if (userData.id === requestedId) {
//       user = userData;
//       console.log(userData);
//       break;
//     }
//   }
//   if (user) {
//     res.cookie('user', user.username);
//     return res.redirect('/listings');
//   }
//   return res.status(404).send('Please try again');
// });

// still need to test db query.

//Logs User into account
router.get('/:id', (req, res) => {
  //grab id from params to match with users.id query
  const userId = req.params.id;

  dbUsers
    .getUserById(userId)
    .then((user) => {
      console.log(user);
      //if user is registered
      if (user) {
        // Set a cookie to maintain the user's session
        res.cookie('userId', user.id);
        return res.redirect('/');
      }
      return res.status(404).send("Please try again");
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    });
});

module.exports = router;
