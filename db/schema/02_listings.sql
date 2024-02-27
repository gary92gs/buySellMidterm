DROP TABLE IF EXISTS listings CASCADE;

CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  street_address TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  country TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  status BOOLEAN DEFAULT NULL
);
