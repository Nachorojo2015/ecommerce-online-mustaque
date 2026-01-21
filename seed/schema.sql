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

CREATE TABLE orders (
  id TEXT NOT NULL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES "user"(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'paid', 'cancelled')
  ),
  subtotal NUMERIC(10, 2) NOT NULL,
  shipping_cost NUMERIC(10, 2) NOT NULL,
  total NUMERIC(10, 2) NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (
    payment_status IN ('pending', 'paid', 'failed')
  ),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE order_address (
  id TEXT NOT NULL PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  fullname TEXT NOT NULL,
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

-- Scripts to insert data

INSERT INTO products (id, slug, title, price, category, genre) VALUES
('p1', 'remeron-fear-of-god', 'Remeron Fear of God', 28990, 'remerones', NULL),
('p2', 'remeron-peace', 'Remeron Peace', 28990, 'remerones', NULL),
('p3', 'remeron-the-pray', 'Remeron the Pray', 28990, 'remerones', NULL),
('p4', 'remeron-baby-cupido', 'Remeron Baby Cupido', 28990, 'remerones', NULL),
('p5', 'remeron-fuck-off-2', 'Remeron Fuck Off 2', 28990, 'remerones', NULL),
('p6', 'remeron-dollar', 'Remeron Dollar', 28990, 'remerones', NULL),
('p7', 'short-peace', 'Short Peace', 35990, 'shorts', NULL),
('p8', 'short-fear-of-god', 'Short Fear of God', 35990, 'shorts', NULL),
('p9', 'short-work-hard', 'Short Work Hard', 35990, 'shorts', NULL),
('p10', 'buzo-cupido-pasamontanas', 'Buzo Cupido Pasamontañas OVERSIZE', 49990, 'buzos', NULL),
('p11', 'remeron-smile', 'Remeron Smile', 24990, 'remerones', NULL),
('p12', 'buzo-world-is-mine', 'Buzo World Is Mine OVERSIZE', 49990, 'buzos', NULL),
('p13', 'buzo-angel-hand', 'Buzo Angel Hand', 37990, 'buzos', NULL),
('p14', 'remeron-angel', 'Remeron Angel', 24990, 'remerones', NULL),
('p15', 'buzo-skeleton-dream', 'Buzo Skeleton Dream', 42990, 'buzos', NULL),
('p16', 'medias-doberman', 'Medias DOBERMAN', 3890, 'medias', NULL),
('p17', 'medias-baby-cupido', 'Medias BABY CUPIDO', 3890, 'medias', NULL),
('p18', 'medias-fear-of-god', 'Medias FEAR OF GOD', 3890, 'medias', NULL),
('p19', 'remeron-dober', 'Remeron Dober', 28990, 'remerones', NULL),
('p20', 'pantalon-pasamontanas', 'Pantalón Pasamontañas', 39990, 'pantalones', NULL),
('p21', 'pantalon-chains', 'Pantalón Chains', 39990, 'pantalones', NULL),
('p22', 'pantalon-skeleton-dream', 'Pantalón Skeleton Dream', 39990, 'pantalones', NULL),
('p23', 'pantalon-fear-of-god', 'Pantalón Fear of God', 39990, 'pantalones', NULL),
('p24', 'gorro-cross-religion-negro', 'Gorro Cross Religion Negro', 7990, 'gorros', NULL),
('p25', 'gorro-fear-of-god-blanco', 'Gorro Fear of God Blanco', 7990, 'gorros', NULL),
('p26', 'gorro-baby-cupido-blanco', 'Gorro Baby Cupido Blanco', 7990, 'gorros', NULL),
('p27', 'gorro-fuck-off-blanco', 'Gorro Fuck Off Blanco', 7990, 'gorros', NULL),
('p28', 'gorro-fear-of-god-azul', 'Gorro Fear of God Azul', 7990, 'gorros', NULL),
('p29', 'gorro-butterfly-gris', 'Gorro Butterfly Gris', 7990, 'gorros', NULL),
('p30', 'gorro-fear-of-god-fucsia', 'Gorro Fear of God Fucsia', 7990, 'gorros', NULL),
('p31', 'conjunto-fear-of-god-1', 'Conjunto Fear of God', 58990, 'conjuntos', NULL),
('p32', 'conjunto-fear-of-god-2', 'Conjunto Fear of God', 58990, 'conjuntos', NULL),
('p33', 'conjunto-peace-1', 'Conjunto Peace', 58990, 'conjuntos', NULL),
('p34', 'conjunto-peace-2', 'Conjunto Peace', 58990, 'conjuntos', NULL);

INSERT INTO product_images (id, product_id, url_image) VALUES
('img1','p1','https://acdn.mitiendanube.com/stores/001/214/214/products/whatsapp-image-2023-07-28-at-16-01-37-11-daa13d7f15047320bb16905719371959-1024-1024.webp'),
('img2','p2','https://acdn.mitiendanube.com/stores/001/214/214/products/peace_crudo_3d1-e29df22a2a3be09fb316934042126847-1024-1024.webp'),
('img3','p3','https://acdn.mitiendanube.com/stores/001/214/214/products/the-pray_negro_espalda1-390924379b033f629216911768505156-1024-1024.webp'),
('img4','p4','https://acdn.mitiendanube.com/stores/001/214/214/products/61-3e927bfb8ac25a652a16787220421103-1024-1024.webp'),
('img5','p5','https://acdn.mitiendanube.com/stores/001/214/214/products/bbf23e41-ee1c-4a7d-8ae0-481553c6860a1-2e752ae2cff465355f16787224121142-1024-1024.webp'),
('img6','p6','https://acdn.mitiendanube.com/stores/001/214/214/products/a5ba9a33-a9b2-4dee-a95e-bf399eb24fdb11-13649e51124a295a6516787317866668-1024-1024.webp'),
('img7','p7','https://acdn.mitiendanube.com/stores/001/214/214/products/short-peace-4-4e432757096ce2b81d17020442696409-1024-1024.webp'),
('img8','p8','https://acdn.mitiendanube.com/stores/001/214/214/products/short-fear-of-god-e51666675ec591983a17016962879531-1024-1024.webp'),
('img9','p9','https://acdn.mitiendanube.com/stores/001/214/214/products/frente-short-2-add6b97186b50844ab17020443864087-1024-1024.webp'),
('img10','p10','https://acdn.mitiendanube.com/stores/001/214/214/products/whatsapp-image-2023-06-02-at-4-42-38-pm1-743c237d40885a201c17013741443083-1024-1024.jpeg'),
('img11','p11','https://acdn.mitiendanube.com/stores/001/214/214/products/remeron-smile-59cb39f8827e035b0317016961564613-1024-1024.png'),
('img12','p12','https://acdn.mitiendanube.com/stores/001/214/214/products/the-world-is-mine-negro-sin-bolsillo-5ecb06aee5e16df43117012599508197-1024-1024.png'),
('img13','p13','https://acdn.mitiendanube.com/stores/001/214/214/products/angel-hand-negro1-4a224a46a89eb37c8916911765495736-1024-1024.png'),
('img14','p14','https://acdn.mitiendanube.com/stores/001/214/214/products/remeron_blanco_angeles-enfrentados_3d1-b2072cfe23caf13e2216908989098616-1024-1024.png'),
('img15','p15','https://acdn.mitiendanube.com/stores/001/214/214/products/whatsapp-image-2023-05-29-at-11-37-471-84830823f80ffce1ae16853722610181-1024-1024.jpeg'),
('img16','p16','https://acdn.mitiendanube.com/stores/001/214/214/products/whatsapp-image-2023-05-02-at-15-43-06-31-ac3b6710c9b9f021a716830569209961-1024-1024.jpeg'),
('img17','p17','https://acdn.mitiendanube.com/stores/001/214/214/products/whatsapp-image-2023-05-02-at-15-43-07-21-0a53a6f011cf11cf3616830570040526-1024-1024.jpeg'),
('img18','p18','https://acdn.mitiendanube.com/stores/001/214/214/products/whatsapp-image-2023-05-02-at-15-43-071-f5eb9cf8c6be0fd74216830571346150-1024-1024.jpeg'),
('img19','p19','https://acdn.mitiendanube.com/stores/001/214/214/products/51-eeb1c65f4334ac4ff416787216562898-1024-1024.webp'),
('img20','p20','https://acdn.mitiendanube.com/stores/001/214/214/products/whatsapp-image-2023-06-02-at-4-43-23-pm-11-0f6902fa140da1c52a16866608341946-1024-1024.webp'),
('img21','p21','https://acdn.mitiendanube.com/stores/001/214/214/products/whatsapp-image-2023-06-02-at-10-30-41-am1-e73b0413679ccc144c16857160082163-1024-1024.webp'),
('img22','p22','https://acdn.mitiendanube.com/stores/001/214/214/products/whatsapp-image-2023-06-01-at-4-42-21-pm1-254479aa40107d82e316856493911289-1024-1024.webp'),
('img23','p23','https://acdn.mitiendanube.com/stores/001/214/214/products/whatsapp-image-2023-05-29-at-11-41-571-e4fd670ea99affd77916853741140140-1024-1024.webp'),
('img24','p24','https://acdn.mitiendanube.com/stores/001/214/214/products/whatsapp-image-2023-05-02-at-10-41-42-21-c625ef1d7f37e4f1a716830533172699-1024-1024.webp'),
('img25','p25','https://acdn.mitiendanube.com/stores/001/214/214/products/whatsapp-image-2023-05-02-at-10-41-27-141-418eea80bac021969016830539591605-1024-1024.webp'),
('img26','p26','https://acdn.mitiendanube.com/stores/001/214/214/products/whatsapp-image-2023-05-02-at-10-41-27-121-948c1c831eb255451316830543309600-1024-1024.webp'),
('img27','p27','https://acdn.mitiendanube.com/stores/001/214/214/products/whatsapp-image-2023-05-02-at-10-41-27-131-2811e8e173882a4d1416830542162413-1024-1024.webp'),
('img28','p28','https://acdn.mitiendanube.com/stores/001/214/214/products/whatsapp-image-2023-05-02-at-10-41-27-81-94975f9d50e6c0290116830549510914-1024-1024.webp'),
('img29','p29','https://acdn.mitiendanube.com/stores/001/214/214/products/whatsapp-image-2023-05-02-at-10-41-27-41-8ce1c9b7019cac1e7d16830553901476-1024-1024.webp'),
('img30','p30','https://acdn.mitiendanube.com/stores/001/214/214/products/whatsapp-image-2023-05-02-at-10-41-42-11-acf2a363d5c8ff302116830534889903-1024-1024.webp'),
('img31','p31','https://acdn.mitiendanube.com/stores/001/214/214/products/conjunto-fear-con-short-remeron-c62cc7ef83bca7655f17020400589400-1024-1024.webp'),
('img32','p32','https://acdn.mitiendanube.com/stores/001/214/214/products/conjunto-fear-con-short-remeron-crudo-48a6a819891f4b5ef217020415833029-1024-1024.png'),
('img33','p33','https://acdn.mitiendanube.com/stores/001/214/214/products/conjunto-reme-negro-short-negro-089c17e7cdaab56ce417020413282190-1024-1024.webp'),
('img34','p34','https://acdn.mitiendanube.com/stores/001/214/214/products/conjunto-reme-negro-short-negro22-0ea0b3b4789aadcd5a17020404530823-1024-1024.webp');

INSERT INTO product_sizes (product_id, size, stock)
SELECT
  p.id,
  s.size,
  10 AS stock
FROM products p
CROSS JOIN (
  VALUES
    ('XS'::sizes),
    ('S'::sizes),
    ('M'::sizes),
    ('L'::sizes),
    ('XL'::sizes),
    ('XXL'::sizes)
) AS s(size)
WHERE p.category NOT IN ('medias', 'gorros');