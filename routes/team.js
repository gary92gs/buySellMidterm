const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // render the team page
  const filterObj = {
    priceCentsMin: Number(req.cookies.priceMin + '00'),
    priceCentsMax: Number(req.cookies.priceMax + '00'),
    userSearch: req.cookies.userSearch,
    city: req.cookies.city,
    province: req.cookies.province,
    country: req.cookies.country,
  };

  const showSearchFilters = false;

  res.render('team', { filterObj, showSearchFilters });
});

module.exports = router;