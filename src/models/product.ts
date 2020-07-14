export interface Product {
    id?:        number;
    name:      string;
    category:  string;
    image:     string;
    price:     number;
    rating?:    number;
    nbReviews?: number;
    stock:  number;
}

export interface ProductReducer {
    id: number,
    name: string,
    image: string,
    price: number,
    stock: number,
    quantity: number
}