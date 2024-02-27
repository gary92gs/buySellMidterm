DROP TABLE IF EXISTS listing_images CASCADE;

CREATE TABLE listing_images (
  id SERIAL PRIMARY KEY NOT NULL,
  listing_id INTEGER REFERENCES listings(id) NOT NULL,
  image_path TEXT NOT NULL
);
