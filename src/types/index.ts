export interface Campaign {
  id: number;
  title: string;
  desc: string;
  img: string;
  color: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  img: string;
}

export interface CartItem {
  name: string;
  price: string;
}
