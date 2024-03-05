const express = require('express');
const router = express.Router();

const dblistings = require('./../db/queries/listingQueries');

//RETRIEVE MANY LISTINGS BASED ON USER-SPECIFIED SEARCH PARAMETERS
router.get('/', (req, res) => {
  //grab search parameters from cookies (will be passed into browseListings query)
  const filterObj = {
    category: req.cookies.category,
    userSearch: req.cookies.userSearch,
    city: req.cookies.city,
    province: req.cookies.province,
    country: req.cookies.country,
    currentPage: req.cookies.currentPage || 1,
  };
  //query the database and render page based on query-results
  dblistings
    .browseListings(filterObj)
    .then((listings) => {
      return res.render('index', { listings, filterObj });
    })
    .catch((err) => {
      console.log(err);
    });
});

//
router.get('/new', (req, res) => {
  return res.status(200).send('You should be seeing this');
});

//RETRIEVE INDIVIDUAL LISTING
router.get('/:id', (req, res) => {
  //necessary for banner (it references cookies)
  const filterObj = {
    userSearch: req.cookies.userSearch,
    city: req.cookies.city,
    province: req.cookies.province,
    country: req.cookies.country,
  };
  //grab id of individual listing that user clicked
  const requestedId = parseInt(req.params.id);
  //query the database for info regarding the user-selected listing
  dblistings
    .getListing(requestedId)
    .then((listingArray) => {
      res.render('listings_show', { listingArray, filterObj });
    })
    .catch((err) => {
      console.log(err);
    });
});

// !! TEST WHEN DB GOES LIVE !!

// * ROUTE TO /LISTINGS *

// * ROUTE TO LISTINGS/NEW *

//GET FORM PAGE FOR CREATE NEW LISTING
// '/listings/:id'
// router.get('/new', (req, res) => {
//   res.render('tbd');
// });

// * ROUTE TO POST LISTING TO DB *

//POST NEW LISTING
// router.post('/', (req, res) => {
//   const {
//     ownerID,
//     title,
//     description,
//     price_cents,
//     street_address,
//     city,
//     country,
//     postal_code,
//     status
//   } = req.body;

//   db.query(`
//     INSERT INTO listings (owner_id, title, description, price_cents, street_address, city, country, postal_code, status)
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//     RETURNING id;`,
//   [ownerID, title, description, price_cents, street_address, city, country, postal_code, status])
//     .then((result) => {
//       const newListingId = result.rows[0].id;
//       return res.redirect(`/show/${newListingId}`);
//     })
//     .catch((error) => {
//       console.error('Error adding new listing:', error);
//       // return res.status(500).send('Internal Server Error');
//     });
// });

// * ROUTE TO LISTINGS/:ID *

// router.get('/:id', (req, res) => {
//   const requestedId = parseInt(req.params.id);
//   db.query('SELECT * FROM listings WHERE id = $1', [requestedId])
//     .then((result) => {
//       if (result.rows.length > 0) {
//         const uniqueListing = result.rows[0];
//         return res.render('tbd', { listing: uniqueListing });
//       }
//       console.log('Listing not found');
//       return res.status(404).send("Please try again")
//     })
//     .catch((error) => {
//       console.error('Error fetching listing:', error);
//       return res.status(500).send("Internal Server Error")
//     });
// });

module.exports = router;
