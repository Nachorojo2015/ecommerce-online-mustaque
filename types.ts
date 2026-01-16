export interface Product {
  id: string;
  title: string;
  price: number;
  slug: string;
  images: string[];
  sizes?: Size[];
  category: Category;
}

export interface ProductItem {
  id: string;
  title: string;
  price: number;
  slug: string;
  images: string[];
}

export interface Size {
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL";
  stock: number;
}

export interface Order {
  id: string;
  status: 'pending' | 'paid' | 'cancelled';
  subtotal: number;
  shipping_cost: number;
  total: number;
  payment_status: number;
  address: {
    fullname: string;
    address: string;
    address2?: string;
    postal_code: string;
    city: string;
    phone: string;
    country: string;
  };
  items: [
    {
      id: string;
      product_id: string;
      size: Size["size"];
      quantity: number;
      unit_price: number;
      total_price: number
    }
  ];
}

type Category = 'buzos' | 'remerones' |'pantalones' | 'shorts' | 'conjuntos' | 'gorros' | 'medias';