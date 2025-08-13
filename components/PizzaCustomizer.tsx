import React, { useState, useMemo, useEffect } from 'react';
import { Pizza, Topping as ToppingType, PizzaSize, CartItem } from '../types';
import { TOPPINGS, SIZES } from '../constants';
import Topping from './Topping';
import { ChevronLeftIcon, CartIcon, CheckIcon } from './icons';

interface PizzaCustomizerProps {
  pizza: Pizza;
  onBack: () => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}

const PizzaCustomizer: React.FC<PizzaCustomizerProps> = ({ pizza, onBack, onAddToCart }) => {
  const [size, setSize] = useState<PizzaSize>('M');
  const [selectedToppings, setSelectedToppings] = useState<ToppingType[]>([]);
  const [isAdded, setIsAdded] = useState(false);
  
  useEffect(() => {
    // Reset state when pizza changes for a fresh customization screen
    setSize('M');
    setSelectedToppings([]);
    setIsAdded(false);
  }, [pizza]);

  const handleToggleTopping = (topping: ToppingType) => {
    setSelectedToppings(prev => {
      const isSelected = prev.find(t => t.id === topping.id);
      if (isSelected) {
        return prev.filter(t => t.id !== topping.id);
      } else {
        return [...prev, topping];
      }
    });
  };

  const totalPrice = useMemo(() => {
    const toppingsPrice = selectedToppings.reduce((sum, topping) => sum + topping.price, 0);
    const sizePrice = SIZES[size];
    return pizza.basePrice + sizePrice + toppingsPrice;
  }, [pizza.basePrice, size, selectedToppings]);

  const handleAddToCartClick = () => {
    if (isAdded) return;

    const cartItem = {
      pizza,
      size,
      toppings: selectedToppings,
      totalPrice,
    };
    onAddToCart(cartItem);
    setIsAdded(true);

    setTimeout(() => {
        onBack();
    }, 1500);
  };

  return (
    <div className='bg-secondary rounded-t-3xl p-4 md:p-6 shadow-2xl max-h-[90vh] flex flex-col'>
      <div className="flex items-center mb-lg flex-shrink-0">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-cardShadow mr-md transition duration-200 ease-in-out hover:bg-gray-200 active:scale-95" aria-label="Go back">
          <ChevronLeftIcon className="h-5 w-5 text-text-primary" />
        </button>
        <h2 className="text-xl font-bold text-text-primary">{pizza.name}</h2>
      </div>
      
      <div className="overflow-y-auto no-scrollbar">
          <div className="flex justify-center mb-md">
            <img src={pizza.imageUrl} alt={pizza.name} className="w-48 h-48 md:w-64 md:h-64 rounded-full shadow-lg object-cover" />
          </div>

          <div className="flex items-center justify-center space-x-lg mb-md">
            {(Object.keys(SIZES) as PizzaSize[]).map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold transition-all duration-200 ease-in-out ${
                  size === s
                    ? 'bg-primary text-text-icon shadow-cardShadow scale-110'
                    : 'bg-white text-text-secondary hover:bg-gray-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="text-center mb-lg">
            <span className="text-3xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
          </div>

          <p className="text-sm text-text-secondary text-center mb-md">Choose your favorite toppings</p>
          
          <div className="no-scrollbar flex justify-center items-center gap-x-md overflow-x-auto pb-md px-4">
            {TOPPINGS.map(topping => (
              <Topping
                key={topping.id}
                topping={topping}
                isActive={!!selectedToppings.find(t => t.id === topping.id)}
                onToggle={handleToggleTopping}
              />
            ))}
          </div>
        </div>


      <div className="mt-auto pt-lg flex-shrink-0">
        <button 
          onClick={handleAddToCartClick}
          disabled={isAdded}
          className={`w-full max-w-sm mx-auto h-14 rounded-full font-bold text-text-icon text-lg flex items-center justify-center space-x-sm shadow-cardShadow transition-all duration-300 ease-in-out ${
              isAdded 
                ? 'bg-green-500 cursor-not-allowed' 
                : 'bg-primary hover:opacity-90 active:scale-95'
          }`}>
          {isAdded ? (
            <>
              <span>Added!</span>
              <CheckIcon className="h-6 w-6" />
            </>
          ) : (
            <>
              <span>Add to Cart</span>
              <CartIcon className="h-6 w-6" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PizzaCustomizer;