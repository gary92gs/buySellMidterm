const db = require('../connection');

const browseListings = (browseFilterObj) => {
  //craft database query based on search parameters
  const queryCraftingArray = [
    `SELECT first_listing_image.image_path, listings.id, title, price_cents, description
    FROM listings
    JOIN (
      SELECT DISTINCT ON (listing_id) listing_id, image_path
      FROM listing_images
      ORDER BY listing_id
    ) AS first_listing_image ON listings.id = first_listing_image.listing_id`,
    ``, // 1 WHERE
    ``, // 2 GROUP BY
    ``, // 3 HAVING
    `ORDER BY id DESC
    LIMIT 12;`
  ];

  //INSERT LOGIC TO EDIT QUERY-CRAFTING-ARRAY BASED ON BROWSE-FILTER-OBJECT CONTENTS

  const craftedQuery = queryCraftingArray.filter(element => element !== '').join(' ');

  //query database and return data to web server
  return db
    .query(craftedQuery)
    .then((result) => {
      return Promise.resolve(result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createListing = (listingObj) => {
  //inserts a new entry in the db's listing table
};

const getListing = (listingId) => {
  //retrieves individual listing
};

const updateListing = (listingId, updatedFieldsObj) => {
  //receives object with fields that need to be updated
};

const deleteListing = (listingId) => {
  //search db listings table by listing_id
  //update status to False
};

const getAllListingImages = (listingId) => {
  //retrieves all images for a specific listing to display
};

module.exports = {
  browseListings
}
