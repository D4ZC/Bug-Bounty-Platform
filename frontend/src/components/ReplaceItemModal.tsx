import React from 'react';
import { ShopItem } from '../contexts/ShopContext';

interface ReplaceItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  item: ShopItem;
  currentItem?: ShopItem;
}

const ReplaceItemModal: React.FC<ReplaceItemModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  item,
  currentItem
}) => {
  if (!isOpen) return null;

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'fondo': return 'FONDO';
      case 'marco': return 'MARCO';
      case 'sticker': return 'STICKER';
      default: return category.toUpperCase();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-4 p-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            ¿QUIERES REEMPLAZAR EL {getCategoryText(item.category)} ACTUAL?
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            {/* Ítem actual */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                {currentItem ? (
                  <img
                    src={currentItem.img}
                    alt={currentItem.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">Ninguno</span>
                )}
              </div>
              <span className="text-xs text-gray-600">
                {currentItem ? currentItem.name : 'Sin seleccionar'}
              </span>
            </div>
            {/* Flecha */}
            <div className="text-2xl text-gray-400">→</div>
            {/* Nuevo ítem */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="text-xs text-gray-600">{item.name}</span>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition-colors"
            >
              No
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Sí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplaceItemModal; 