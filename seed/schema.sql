CREATE TYPE category_products AS ENUM ('buzos', 'remerones', 'pantalones', 'shorts', 'conjuntos', 'gorros', 'medias');

CREATE TYPE sizes AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL');

CREATE TYPE genres AS ENUM ('hombre', 'mujer');

-- Productos
CREATE TABLE products (
  id TEXT NOT NULL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category category_products,
  genre genres
);

CREATE TABLE product_images (
  id TEXT NOT NULL PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url_image TEXT NOT NULL
);

CREATE TABLE product_sizes (
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size sizes NOT NULL,
  stock INT NOT NULL CHECK (stock >= 0),
  PRIMARY KEY (product_id, size)
);

CREATE TABLE order_address (
  id TEXT NOT NULL PRIMARY KEY,
  fullname TEXT NOT NULL,
  address TEXT NOT NULL,
  address2 TEXT,
  postal_code TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT NOT NULL,
  country_id TEXT NOT NULL
);





