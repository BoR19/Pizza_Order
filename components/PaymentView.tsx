import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { ChevronLeftIcon, BackspaceIcon } from './icons';

interface PaymentViewProps {
  total: number;
  onPaymentSuccess: (details: { total: number; amountReceived: number; change: number; }) => void;
  onBack: () => void;
}

const NumpadButton: React.FC<{ onClick: () => void; children: React.ReactNode, className?: string }> = ({ onClick, children, className }) => (
    <button onClick={onClick} className={`text-2xl font-semibold text-gray-700 rounded-lg h-16 flex items-center justify-center transition-colors duration-200 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 ${className}`}>
        {children}
    </button>
);

const SuggestionButton: React.FC<{ amount: number, onSelect: (amount: number) => void }> = ({ amount, onSelect }) => (
    <button onClick={() => onSelect(amount)} className="border-2 border-primary-blue rounded-lg px-4 py-2 text-primary-blue font-semibold transition-colors hover:bg-light-blue-bg">
        ${amount.toFixed(2)}
    </button>
);

const PaymentView: React.FC<PaymentViewProps> = ({ total, onPaymentSuccess, onBack }) => {
  const [amountStr, setAmountStr] = useState('');
  const amountReceived = parseFloat(amountStr) || 0;
  const change = amountReceived - total;
  const canCharge = amountReceived >= total;
  
  const handleNumpad = (value: string) => {
    if (value === '.') {
        if (amountStr.includes('.')) return;
        setAmountStr(amountStr ? amountStr + '.' : '0.');
    } else {
        setAmountStr(prevAmountStr => {
          if (prevAmountStr === '0' && value !== '0') return value;
          if (prevAmountStr.includes('.') && prevAmountStr.split('.')[1].length >= 2) return prevAmountStr;
          return prevAmountStr + value;
        });
    }
  };

  const handleBackspace = () => {
    setAmountStr(str => str.slice(0, -1));
  };
  
  const suggestionAmounts = useMemo(() => {
    const exact = total;
    const next5 = Math.ceil(total / 5) * 5;
    const next10 = Math.ceil(total / 10) * 10;
    
    const suggestions = [exact];
    if (next5 > exact && next5 !== next10) suggestions.push(next5);
    if (next10 > exact && next10 > next5) suggestions.push(next10);

    return [...new Set(suggestions)].slice(0, 3);
  }, [total]);

  const handleCharge = () => {
    if (!canCharge) return;
    onPaymentSuccess({
        total,
        amountReceived,
        change,
    });
  }

  const view = (
    <div className="fixed inset-0 bg-white z-50 flex flex-col font-sans">
      <header className="p-4 flex items-center border-b">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100" aria-label="Go back">
          <ChevronLeftIcon className="w-6 h-6 text-text-primary" />
        </button>
        <h2 className="text-xl font-bold text-text-primary mx-auto">Cash Payment</h2>
        <div className="w-8"></div>
      </header>

      <main className="flex-grow flex flex-col p-6">
        <div className="text-center">
            <p className="text-text-secondary">Amount Received</p>
            <p className="text-5xl font-bold text-primary-blue my-2">${amountStr || '0.00'}</p>
            {canCharge && <p className="text-text-secondary">Change: <span className="font-semibold text-green-600">${change.toFixed(2)}</span></p>}
        </div>
        
        <div className="flex justify-center items-center space-x-4 my-8">
            {suggestionAmounts.map(amount => (
                <SuggestionButton key={amount} amount={amount} onSelect={(val) => setAmountStr(val.toFixed(2))} />
            ))}
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'].map(val => (
                <NumpadButton key={val} onClick={() => handleNumpad(val)}>{val}</NumpadButton>
            ))}
            <NumpadButton onClick={handleBackspace}><BackspaceIcon className="w-8 h-8 text-gray-600"/></NumpadButton>
        </div>
      </main>
      
      <footer className="p-4">
        <button 
            onClick={handleCharge}
            disabled={!canCharge}
            className="w-full h-14 rounded-full font-bold text-white text-lg flex items-center justify-center transition-all duration-300 ease-in-out bg-primary-blue disabled:bg-blue-300 disabled:cursor-not-allowed hover:bg-blue-700 active:scale-95"
        >
            Charge ${total.toFixed(2)}
        </button>
      </footer>
    </div>
  );
  
  const portalElement = document.getElementById('checkout-portal');
  return portalElement ? ReactDOM.createPortal(view, portalElement) : null;
};

export default PaymentView;