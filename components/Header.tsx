
import React from 'react';
import { SearchIcon, UserIcon, CartIcon } from './icons';

interface IconButtonProps { 
    children: React.ReactNode; 
    'aria-label': string;
    onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ children, 'aria-label': ariaLabel, onClick }) => (
    <button
        onClick={onClick}
        aria-label={ariaLabel}
        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white shadow-cardShadow transition duration-200 ease-in-out hover:bg-gray-100 active:scale-95"
    >
        {children}
    </button>
);


interface HeaderProps {
    cartItemCount: number;
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
    return (
        <header className="flex justify-between items-center mb-xl">
            <h1 className="text-2xl font-bold text-text-primary">Order Manually</h1>
            <div className="flex items-center space-x-2 md:space-x-md">
                <IconButton aria-label="Search">
                    <SearchIcon className="h-5 w-5 text-text-primary" />
                </IconButton>
                <IconButton aria-label="Profile">
                    <UserIcon className="h-5 w-5 text-text-primary" />
                </IconButton>
                <div className="relative">
                    <IconButton aria-label="Open shopping cart" onClick={onCartClick}>
                        <CartIcon className="h-5 w-5 text-text-primary" />
                    </IconButton>
                    {cartItemCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-xs font-bold pointer-events-none">
                            {cartItemCount}
                        </span>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;