const express = require('express');
const router = express.Router();

// uncomment when db is live
// const db = require('../connection');

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


router.get('/:id', (req, res) => {
  const requestedId = parseInt(req.params.id);
  let user;

  for (const userData of usersData) {
    if (userData.id === requestedId) {
      user = userData;
      console.log(userData);
      break;
    }
  }
  if (user) {
    res.cookie('user', user.username);
    return res.redirect('/listings');
  }
  return res.status(404).send('Please try again');
});

// still need to test db query.

// router.get('/:id', (req, res) => {
//   const userId = req.params.id;

//   db.query(`SELECT *
//      FROM users
//      WHERE id = $1`,
//   [userId])
//     .then((results) => {
//       if (results.rows.length > 0) {
//         // Set a cookie to maintain the user's session
//         const username = results.rows[0].username;
//         res.cookie('user', username);
//         return res.redirect('/');
//       }
//       return res.status(404).send("Please try again");
//     })
//     .catch((error) => {
//       console.log(error);
//       return res.status(500).send("Internal Server Error");
//     });
// });

module.exports = router;