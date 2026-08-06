DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS order_address CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS product_sizes CASCADE;
DROP TABLE IF EXISTS product_images CASCADE;
DROP TABLE IF EXISTS products CASCADE;

DROP TYPE IF EXISTS category_products;
DROP TYPE IF EXISTS sizes;
DROP TYPE IF EXISTS genres;

CREATE TYPE category_products AS ENUM ('buzos', 'remerones', 'pantalones', 'shorts', 'conjuntos', 'gorros', 'medias');
CREATE TYPE sizes AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL');
CREATE TYPE genres AS ENUM ('hombre', 'mujer');


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
  public_id TEXT NOT NULL,
  url_image TEXT NOT NULL
);

CREATE TABLE product_sizes (
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size sizes NOT NULL,
  stock INT NOT NULL CHECK (stock >= 0),
  PRIMARY KEY (product_id, size)
);

CREATE TABLE orders (
  id TEXT NOT NULL PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'paid', 'cancelled')
  ),
  subtotal NUMERIC(10, 2) NOT NULL,
  shipping_cost NUMERIC(10, 2) NOT NULL,
  total NUMERIC(10, 2) NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (
    payment_status IN ('pending', 'paid', 'failed')
  ),
  preference_id TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE order_address (
  id TEXT NOT NULL PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  fullname TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  address2 TEXT,
  postal_code TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL
);

CREATE TABLE order_items (
  id TEXT PRIMARY KEY NOT NULL,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  size TEXT,
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10, 2) NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL
);