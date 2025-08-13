
import { Pizza, Topping, PizzaSize } from './types';

export const PIZZAS: Pizza[] = [
  {
    id: 1,
    name: 'New Orleans Pizza',
    rating: 5,
    basePrice: 15,
    imageUrl: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
  },
  {
    id: 2,
    name: 'Ham Pizza',
    rating: 4,
    basePrice: 12,
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
  },
  {
    id: 3,
    name: 'Veggie Supreme',
    rating: 4,
    basePrice: 14,
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
  },
  {
    id: 4,
    name: 'Pepperoni Classic',
    rating: 5,
    basePrice: 13,
    imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
  },
];

export const TOPPINGS: Topping[] = [
  { id: 1, name: 'Mushrooms', price: 1, imageUrl: 'https://img.icons8.com/plasticine/100/mushroom.png' },
  { id: 2, name: 'Pepperoni', price: 2, imageUrl: 'https://img.icons8.com/plasticine/100/salami.png' },
  { id: 3, name: 'Olives', price: 1, imageUrl: 'https://img.icons8.com/plasticine/100/olives.png' },
  { id: 4, name: 'Onions', price: 1, imageUrl: 'https://img.icons8.com/plasticine/100/onion.png' },
  { id: 5, name: 'Bacon', price: 2, imageUrl: 'https://img.icons8.com/plasticine/100/bacon.png' },
  { id: 6, name: 'Peppers', price: 1, imageUrl: 'https://img.icons8.com/plasticine/100/paprika.png' },
];

export const SIZES: { [key in PizzaSize]: number } = {
  S: -2,
  M: 0,
  L: 3,
};
