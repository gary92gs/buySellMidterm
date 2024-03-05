const express = require('express');
const router = express.Router();

const dbUsers = require('./../db/queries/userQueries');

//Logs User into account
router.get('/:id', (req, res) => {
  //grab id from params to match with users.id query
  const userId = req.params.id;

  dbUsers
    .getUserById(userId)
    .then((user) => {
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
