const db = require('../connection.js');

//inserts multiple images belonging to a single listing into listing_images table
const postListingImages = (listingId, imagePathsArray) => {
  const craftedQuery = `
    INSERT INTO listing_images (listing_id, image_path) VALUES
  `;

  //crafts query based on the amount of image paths provided, then appends ';' for sql syntax
  for (const imagePath of imagePathsArray) {
    craftedQuery += `(${listingId, imagePath})`
  }
  craftedQuery += ';';

  return db
    .query(craftedQuery)
    .then(() => {
      return Promise.resolve();
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  postListingImages,
};
