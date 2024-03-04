const express = require('express');
const router = express.Router();

const dblistings = require('./../db/queries/listingQueries');

//can we delete listings? Note: Ask Garrett why 'const' keyword is better here
let listings = [
  { id: 1, title: 'Listing 1', description: 'Description for listing 1' },
  { id: 2, title: 'Listing 2', description: 'Description for listing 2' },
  { id: 3, title: 'Listing 3', description: 'Description for listing 3' }
];

router.get('/', (req, res) => {
  //ADD LOGIC TO BUILD BROWSE-FILTER-OBJ BASED ON USER SEARCH PARAMETERS FROM CLIENT
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
      //res.json(listings); // for if we use ajax request
      return res.render('index', {listings, filterObj});
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/new', (req, res) => {
  return res.status(200).send('You should be seeing this');
});

router.get('/:id', (req, res) => {
  const requestedId = parseInt(req.params.id);
  let uniqueListing;
  for (const listing of listings) {
    if (listing.id === requestedId) {
      uniqueListing = listing;
      break;
    }
  }
  if (!uniqueListing) {
    return res.status(404).send('Listing not found');
  }
  res.json(uniqueListing);
});

// !! TEST WHEN DB GOES LIVE !!

// * ROUTE TO /LISTINGS *

// router.get('/'), (req, res) => {
//   db.query(`SELECT *
//   FROM listings`)
//     .then((results) => {
//       listings = results.rows;
//       return res.render('listings', { listings });
//     })
//     .catch((error) => {
//       console.log(error);
//       return res.status(500).send("Internal Server Error");
//     });
// };

// * ROUTE TO LISTINGS/NEW *

// router.get('/new', (req, res) => {
//   res.render('tbd');
// });

// * ROUTE TO POST LISTING TO DB *

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
