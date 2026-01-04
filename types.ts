export interface Product {
  id: string;
  title: string;
  price: number;
  slug: string;
  images: string[];
  sizes?: Size[];
}

export interface ProductItem {
  id: string;
  title: string;
  price: number;
  slug: string;
  images: string[];
}

interface Size {
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL";
  stock: number;
}
