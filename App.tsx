import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import PizzaCard from './components/PizzaCard';
import PizzaCustomizer from './components/PizzaCustomizer';
import Cart from './components/Cart';
import PaymentView from './components/PaymentView';
import SuccessView from './components/SuccessView';
import PrintableTicket from './components/PrintableTicket';
import TicketView from './components/TicketView';
import { PIZZAS } from './constants';
import { Pizza, CartItem, CompletedTransaction } from './types';

type ViewState = 'ordering' | 'payment' | 'success' | 'ticket';

const App: React.FC = () => {
    const [view, setView] = useState<ViewState>('ordering');
    const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [completedTransaction, setCompletedTransaction] = useState<CompletedTransaction | null>(null);
    const [ticketCounter, setTicketCounter] = useState(1);
    
    // Printing logic
    const handlePrintTicket = () => {
        const timer = setTimeout(() => {
            window.print();
        }, 100);
        return () => clearTimeout(timer);
    };

    const handleSelectPizza = (pizza: Pizza) => {
        setSelectedPizza(pizza);
    };

    const handleCloseCustomizer = () => {
        setSelectedPizza(null);
    };

    const handleAddToCart = (item: Omit<CartItem, 'id'>) => {
        setCartItems(prev => [...prev, { ...item, id: new Date().toISOString() + Math.random() }]);
    };

    const handleRemoveFromCart = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };
    
    const handleProceedToPayment = () => {
        if (cartItems.length === 0) return;
        setIsCartOpen(false);
        setView('payment');
    };

    const handlePaymentSuccess = (transaction: Omit<CompletedTransaction, 'order' | 'date' | 'ticketNumber'>) => {
        const fullTransaction = {
            ...transaction,
            order: cartItems,
            date: new Date().toISOString(),
            ticketNumber: ticketCounter,
        };
        setCompletedTransaction(fullTransaction);
        setCartItems([]);
        setTicketCounter(prev => prev + 1);
        setView('success');
    };
    
    const handleStartNewSale = () => {
        setCompletedTransaction(null);
        setView('ordering');
    }

    const handleShowTicket = () => {
        setView('ticket');
    }

    const totalInCart = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    return (
        <div className="min-h-screen font-sans text-text-primary">
            <main className="container mx-auto p-4 md:p-6 lg:p-8 relative">
                <Header cartItemCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />

                <div className="flex items-center space-x-sm mb-lg">
                    <span className="text-sm font-medium text-text-secondary">Category:</span>
                    <span className="text-sm px-4 py-1 rounded-full font-medium text-text-icon bg-primary">Pizza</span>
                </div>

                <section aria-labelledby="popular-pizzas-heading">
                    <h2 id="popular-pizzas-heading" className="text-xl font-bold mb-md text-text-primary">Popular</h2>
                    <div className="no-scrollbar flex space-x-lg overflow-x-auto pb-md -mx-4 px-4">
                        {PIZZAS.map((pizza) => (
                            <PizzaCard key={pizza.id} pizza={pizza} onSelect={handleSelectPizza} />
                        ))}
                    </div>
                </section>
                
                {selectedPizza && (
                     <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40" onClick={handleCloseCustomizer} />
                )}
                
                <div className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out ${selectedPizza ? 'translate-y-0' : 'translate-y-full'}`}>
                   {selectedPizza && <PizzaCustomizer pizza={selectedPizza} onBack={handleCloseCustomizer} onAddToCart={handleAddToCart} />}
                </div>

                <Cart 
                  isOpen={isCartOpen}
                  items={cartItems}
                  onClose={() => setIsCartOpen(false)}
                  onRemoveItem={handleRemoveFromCart}
                  onCheckout={handleProceedToPayment}
                />

                {view === 'payment' && (
                  <PaymentView
                    total={totalInCart}
                    onPaymentSuccess={handlePaymentSuccess}
                    onBack={() => setView('ordering')}
                  />
                )}

                {view === 'success' && completedTransaction && (
                  <SuccessView
                    transaction={completedTransaction}
                    onNewSale={handleStartNewSale}
                    onShowTicket={handleShowTicket}
                  />
                )}

                {view === 'ticket' && completedTransaction && (
                  <TicketView
                    transaction={completedTransaction}
                    onClose={() => setView('success')}
                    onPrint={handlePrintTicket}
                  />
                )}
                
                {completedTransaction && ReactDOM.createPortal(
                    <div className="hidden print:block">
                        <PrintableTicket transaction={completedTransaction} />
                    </div>,
                    document.getElementById('printable-ticket-container')!
                )}
            </main>
        </div>
    );
};

export default App;