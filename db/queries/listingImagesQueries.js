const db = require('../connection.js');

//inserts multiple images belonging to a single listing into listing_images table
const postListingImages = (listingId, imagePathsArray) => {
  let craftedQuery = `INSERT INTO listing_images (listing_id, image_path) VALUES `;
  let craftedQueryArray = [];

  //crafts query based on the amount of image paths provided, then appends ';' for sql syntax
  for (const imagePath of imagePathsArray) {
    craftedQueryArray.push(`(${listingId}, '${imagePath}')`)
  }
  craftedQuery += craftedQueryArray.join(', ') + ';';
  console.log(craftedQuery);
  return db
    .query(craftedQuery)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  postListingImages,
};
