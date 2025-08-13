import React from 'react';
import ReactDOM from 'react-dom';
import { CartItem } from '../types';
import { XIcon, TrashIcon } from './icons';

interface CartProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, items, onClose, onRemoveItem, onCheckout }) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

  const cartContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="cart-heading">
        <div className="fixed inset-0" onClick={onClose} aria-hidden="true"></div>
        <div className={`w-full max-w-md h-full bg-secondary shadow-2xl flex flex-col relative transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <header className="p-4 flex justify-between items-center border-b border-gray-300 flex-shrink-0">
                <h2 id="cart-heading" className="text-xl font-bold text-text-primary">My Order</h2>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200" aria-label="Close cart">
                    <XIcon className="w-6 h-6 text-text-secondary" />
                </button>
            </header>

            {items.length === 0 ? (
                <div className="flex-grow flex flex-col justify-center items-center text-text-secondary p-4 text-center">
                    <p className="text-lg">Your cart is empty.</p>
                    <button onClick={onClose} className="mt-4 px-6 py-2 bg-primary text-text-icon rounded-full font-semibold hover:opacity-90">
                        Start Ordering
                    </button>
                </div>
            ) : (
                <>
                    <div className="flex-grow overflow-y-auto p-4 space-y-4">
                        {items.map(item => (
                            <div key={item.id} className="bg-white rounded-lg p-3 flex items-start space-x-3 shadow-sm">
                                <img src={item.pizza.imageUrl} alt={item.pizza.name} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
                                <div className="flex-grow">
                                    <h3 className="font-bold text-text-primary">{item.pizza.name} ({item.size})</h3>
                                    <p className="text-xs text-text-secondary">
                                        {item.toppings.length > 0 ? item.toppings.map(t => t.name).join(', ') : 'No extra toppings'}
                                    </p>
                                    <p className="font-bold text-primary mt-1">${item.totalPrice.toFixed(2)}</p>
                                </div>
                                <button onClick={() => onRemoveItem(item.id)} className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-100 rounded-full flex-shrink-0" aria-label={`Remove ${item.pizza.name}`}>
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <footer className="p-4 border-t border-gray-300 bg-white flex-shrink-0">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold">
                            <span className="text-text-primary">Total:</span>
                            <span className="text-primary">${total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={onCheckout}
                            className="w-full h-12 rounded-full font-bold text-text-icon bg-primary shadow-cardShadow transition duration-200 ease-in-out hover:opacity-90 active:scale-95"
                        >
                            Proceed to Payment
                        </button>
                    </footer>
                </>
            )}
        </div>
    </div>
  );

  const portalElement = document.getElementById('cart-portal');
  return portalElement ? ReactDOM.createPortal(cartContent, portalElement) : null;
};

export default Cart;