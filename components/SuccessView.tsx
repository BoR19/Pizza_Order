import React from 'react';
import ReactDOM from 'react-dom';
import { CompletedTransaction } from '../types';
import { CheckIcon, ReceiptIcon } from './icons';

interface SuccessViewProps {
  transaction: CompletedTransaction;
  onNewSale: () => void;
  onShowTicket: () => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({ transaction, onNewSale, onShowTicket }) => {
  const view = (
    <div className="fixed inset-0 bg-white z-50 flex flex-col font-sans p-6 text-center">
      <div className="flex-grow flex flex-col justify-center items-center">
        <div className="w-24 h-24 rounded-full bg-light-blue-bg flex items-center justify-center mb-6">
            <CheckIcon className="w-16 h-16 text-primary-blue" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary">Done</h2>
        <p className="text-5xl font-bold text-text-primary my-2">${transaction.total.toFixed(2)}</p>
        <p className="text-text-secondary">Change: ${transaction.change.toFixed(2)}</p>
      </div>

      <div className="flex-shrink-0 space-y-3">
        <a href="#" className="font-semibold text-primary-blue">Invoice Sale</a>
        <button 
            onClick={onShowTicket}
            className="w-full h-14 rounded-full font-bold text-primary-blue text-lg flex items-center justify-center space-x-2 border-2 border-gray-300 transition hover:bg-gray-100 active:scale-95"
        >
            <ReceiptIcon className="w-6 h-6" />
            <span>Print or Share Ticket</span>
        </button>
        <button
            onClick={onNewSale}
            className="w-full h-14 rounded-full font-bold text-white text-lg bg-primary-blue transition hover:bg-blue-700 active:scale-95"
        >
            Start New Sale
        </button>
      </div>
    </div>
  );

  const portalElement = document.getElementById('checkout-portal');
  return portalElement ? ReactDOM.createPortal(view, portalElement) : null;
};

export default SuccessView;