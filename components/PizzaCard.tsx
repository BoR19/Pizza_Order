
import React from 'react';
import { Pizza } from '../types';
import { PlusIcon } from './icons';

interface PizzaCardProps {
    pizza: Pizza;
    onSelect: (pizza: Pizza) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const stars = Array.from({ length: 5 }, (_, i) => i < rating ? '★' : '☆');
    return (
        <div className="flex items-center text-primary mb-sm" aria-label={`Rating: ${rating} out of 5 stars`}>
            {stars.join('')}
        </div>
    );
};

const PizzaCard: React.FC<PizzaCardProps> = ({ pizza, onSelect }) => {
    return (
        <article
            className="flex-none bg-white rounded-2xl p-md shadow-cardShadow transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 w-64 cursor-pointer"
            onClick={() => onSelect(pizza)}
            role="button"
            aria-label={`Select ${pizza.name}`}
        >
            <img src={pizza.imageUrl} alt={pizza.name} className="w-full h-40 object-cover rounded-lg mb-md" />
            <h3 className="text-lg font-bold text-text-primary mb-xs truncate">{pizza.name}</h3>
            <StarRating rating={pizza.rating} />
            <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-primary">${pizza.basePrice.toFixed(2)}</span>
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-text-icon shadow-md">
                    <PlusIcon className="h-5 w-5" />
                </div>
            </div>
        </article>
    );
};

export default PizzaCard;