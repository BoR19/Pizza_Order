
import React from 'react';
import { Topping as ToppingType } from '../types';

interface ToppingProps {
  topping: ToppingType;
  isActive: boolean;
  onToggle: (topping: ToppingType) => void;
}

const Topping: React.FC<ToppingProps> = ({ topping, isActive, onToggle }) => {
  const baseClasses = "flex-none flex items-center justify-center rounded-full w-14 h-14 shadow-cardShadow cursor-pointer transition-all duration-200 ease-in-out";
  const activeClasses = "bg-accent-topping-active border-2 border-primary scale-110";
  const inactiveClasses = "bg-white hover:bg-gray-200";

  return (
    <div
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      onClick={() => onToggle(topping)}
      role="checkbox"
      aria-checked={isActive}
      tabIndex={0}
      onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && onToggle(topping)}
    >
      <img src={topping.imageUrl} alt={topping.name} title={`${topping.name} (+$${topping.price})`} className="w-8 h-8 object-contain" />
    </div>
  );
};

export default Topping;