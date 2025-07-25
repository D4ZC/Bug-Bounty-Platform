import React from 'react';

export const CartIcon: React.FC<{ count: number; onClick: () => void; bump?: boolean }> = ({ count, onClick, bump }) => (
  <div className={`cursor-pointer animate-fade-in ${bump ? 'animate-bounce' : ''}`} onClick={onClick}>
    <div className="relative">
      <svg className="w-10 h-10 text-blue-700 drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center border-2 border-white">{count}</span>
      )}
    </div>
  </div>
);

export const CartDrawer: React.FC<{
  open: boolean;
  items: any[];
  onClose: () => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
  onQtyChange?: (id: number, qty: number) => void;
}> = ({ open, items, onClose, onRemove, onCheckout, onQtyChange }) => {
  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  return (
    <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-bold text-blue-800">Carrito de compras</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-gray-500 text-center mt-8">El carrito está vacío.</div>
        ) : (
          <ul className="space-y-4">
            {items.map(item => (
              <li key={item.id} className="flex items-center gap-3 border-b pb-2">
                <img src={item.img} alt={item.name} className="w-10 h-10 rounded" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-sm">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.price} pts x {item.qty}</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <button onClick={() => onQtyChange && onQtyChange(item.id, item.qty + 1)} className="text-green-600 hover:text-green-800 text-lg font-bold">+</button>
                  <span className="text-sm font-semibold">{item.qty}</span>
                  <button onClick={() => onQtyChange && onQtyChange(item.id, Math.max(1, item.qty - 1))} className="text-blue-600 hover:text-blue-800 text-lg font-bold">-</button>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700 text-lg">🗑️</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-between font-bold text-blue-800 text-lg">
        <span>Total:</span>
        <span>{total} pts</span>
      </div>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm font-semibold disabled:opacity-50"
        disabled={items.length === 0}
        onClick={onCheckout}
      >
        Canjear todo
      </button>
    </div>
  );
}; 