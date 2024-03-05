const express = require('express');
const router = express.Router();

const dblistings = require('./../db/queries/listingQueries');
const dbImages = require('./../db/queries/listingImagesQueries');

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

// GET FORM PAGE FOR CREATE NEW LISTING
router.get('/new', (req, res) => {
  //necessary for banner (it references cookies)
  const filterObj = {
    userSearch: req.cookies.userSearch,
    city: req.cookies.city,
    province: req.cookies.province,
    country: req.cookies.country,
  };

  res.render('listings_new', { filterObj });
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

//POST/CREATE NEW LISTING
router.post('/', (req, res) => {
  console.log('req.cookies', req.cookies);

  //check if user is logged in (only logged-in/registered users can post ads)

  //grab listing details required for posting to listings table (to be passed as arguement)
  const listingObj = {
    ownerId: req.cookies.id, //.id may need to be changed
    title: req.body.title,
    description: req.body.description,
    priceCents: req.body.priceDollars + '00',
    category: req.body.category,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    province: req.body.province,
    country: req.body.country,
    postalCode: req.body.postalCode,
    status: true,
  };
  console.log('listingObj', listingObj);

  // dblistings
  //   .postNewListing(listingObj)
  //   .then(() => {
  //     dbImages.postListingImages()
  //   })
  //   .then(() => {

  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  res.redirect('/listings');
});

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
