const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  return res.status(200).send('You should be seeing this');
})

// router.get('/new', (req, res) => {
//   userQueries.getUsers()
//     .then(users => {
//       res.json({ users });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

module.exports = router;