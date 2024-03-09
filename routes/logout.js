const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // clear cookie
  res.clearCookie('userId');
  // reload listings page
  res.redirect('/listings')
});

module.exports = router;