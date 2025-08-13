import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { CompletedTransaction } from '../types';
import { XIcon, PrintIcon, ShareIcon } from './icons';
import PrintableTicket from './PrintableTicket';

// Make TypeScript aware of the html2canvas library loaded from CDN
declare const html2canvas: any;

interface TicketViewProps {
  transaction: CompletedTransaction;
  onClose: () => void;
  onPrint: () => void;
}

const TicketView: React.FC<TicketViewProps> = ({ transaction, onClose, onPrint }) => {
    const ticketRef = useRef<HTMLDivElement>(null);

    const handleShare = async () => {
        if (!ticketRef.current) return;

        try {
            const canvas = await html2canvas(ticketRef.current, {
                useCORS: true,
                scale: 2,
                backgroundColor: '#ffffff',
                scrollY: -window.scrollY // Capture from the top
            });
            
            canvas.toBlob(async (blob) => {
                if (!blob) {
                    console.error('Canvas to Blob conversion failed.');
                    alert('Could not generate ticket image.');
                    return;
                }

                const file = new File([blob], `ticket-${transaction.ticketNumber}.png`, { type: 'image/png' });

                if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        files: [file],
                        title: `Ticket #${transaction.ticketNumber}`,
                        text: `Here's your receipt for $${transaction.total.toFixed(2)}.`
                    });
                } else {
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/png');
                    link.download = `ticket-${transaction.ticketNumber}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }, 'image/png');
        } catch (error) {
            console.error('Error generating or sharing ticket image:', error);
            alert('An error occurred while trying to share the ticket.');
        }
    };

    const view = (
        <div className="fixed inset-0 bg-gray-100 z-50 flex flex-col font-sans">
            <header className="p-4 flex items-center justify-between border-b bg-white flex-shrink-0">
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200" aria-label="Close ticket view">
                    <XIcon className="w-6 h-6 text-gray-700" />
                </button>
                <span className="font-semibold">Ticket Details</span>
                <div className="w-8"></div>
            </header>
            
            <main className="flex-grow overflow-y-auto no-scrollbar py-6">
                {/* The PrintableTicket is the content we want to capture */}
                <PrintableTicket ref={ticketRef} transaction={transaction} />
            </main>
            
            <footer className="p-2 bg-gray-800 text-white flex justify-around items-center flex-shrink-0">
                <button onClick={onPrint} className="flex flex-col items-center justify-center space-y-1 w-1/2 h-16 transition-colors hover:bg-gray-700 rounded-lg">
                    <PrintIcon className="w-6 h-6" />
                    <span className="text-sm font-semibold">Imprimir</span>
                </button>
                <div className="h-10 border-l border-gray-600"></div>
                <button onClick={handleShare} className="flex flex-col items-center justify-center space-y-1 w-1/2 h-16 transition-colors hover:bg-gray-700 rounded-lg">
                    <ShareIcon className="w-6 h-6" />
                    <span className="text-sm font-semibold">Compartir</span>
                </button>
            </footer>
        </div>
    );
    
    const portalElement = document.getElementById('checkout-portal');
    return portalElement ? ReactDOM.createPortal(view, portalElement) : null;
};

export default TicketView;