import React, { useMemo, forwardRef } from 'react';
import { CompletedTransaction, CartItem } from '../types';

interface PrintableTicketProps {
  transaction: CompletedTransaction;
}

const PrintableTicket = forwardRef<HTMLDivElement, PrintableTicketProps>(({ transaction }, ref) => {
  if (!transaction) {
    return null;
  }
  
  const { order, total, amountReceived, change, date, ticketNumber } = transaction;

  const groupedItems = useMemo(() => {
    const map = new Map<string, { item: CartItem, quantity: number }>();
    transaction.order.forEach(item => {
        const key = `${item.pizza.id}-${item.size}-${item.toppings.map(t => t.id).sort().join(',')}`;
        const existing = map.get(key);
        if (existing) {
            existing.quantity++;
        } else {
            map.set(key, { item: item, quantity: 1 });
        }
    });
    return Array.from(map.values());
  }, [transaction.order]);

  const totalQuantity = transaction.order.length;
  const uniqueItemsCount = groupedItems.length;

  const formattedDate = new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div ref={ref} className="font-mono bg-white text-black p-4 text-sm max-w-xs mx-auto">
        <header className="flex justify-between items-start mb-4">
            <img src="https://placehold.co/50x50/e0e0e0/000000.png?text=LOGO" alt="logo" className="w-12 h-12 rounded-full" />
            <div className="text-right">
                <p className="text-lg font-bold">#{ticketNumber}</p>
            </div>
        </header>

        <div className="text-left mb-4">
            <h2 className="text-base font-bold uppercase">COMO EN CASA</h2>
            <p className="text-xs text-gray-600">Tolomosa • S/N • 73327523 • Hector Mora</p>
            <p className="text-xs text-gray-600">Atendió: Mariano</p>
        </div>
        
        <div className="border-t border-b border-dashed border-black py-2 my-2">
            <h3 className="font-bold text-xs">{uniqueItemsCount} artículos (Cant.: {totalQuantity})</h3>
        </div>

        <div className="space-y-3 my-4">
            {groupedItems.map(({ item, quantity }, index) => (
                <div key={index} className="flex justify-between items-start">
                    <div className="flex">
                        <span className="font-semibold mr-2 text-xs">{quantity}x</span>
                        <div>
                            <p className="font-semibold text-xs">{item.pizza.name} ({item.size})</p>
                            <p className="text-xs text-gray-500">${item.pizza.basePrice.toFixed(2)}</p>
                            {item.toppings.length > 0 && (
                                <p className="text-xs text-gray-500 pl-1">
                                    + {item.toppings.map(t => t.name).join(', ')}
                                </p>
                            )}
                        </div>
                    </div>
                    <span className="font-semibold text-xs">${(item.totalPrice * quantity).toFixed(2)}</span>
                </div>
            ))}
        </div>

        <div className="border-t border-dashed border-black mt-4 pt-2 space-y-1 text-xs">
            <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
                <span>Efectivo:</span>
                <span>${amountReceived.toFixed(2)}</span>
            </div>
             <div className="flex justify-between">
                <span>Cambio:</span>
                <span>${change.toFixed(2)}</span>
            </div>
        </div>

        <footer className="text-center mt-6">
            <p className="text-xs">Gracias por su visita</p>
            <p className="text-xs text-gray-600">{formattedDate}</p>
        </footer>
    </div>
  );
});

export default PrintableTicket;