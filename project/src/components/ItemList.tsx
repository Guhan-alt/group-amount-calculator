import React from 'react';
import { Trash2 } from 'lucide-react';
import { Item } from '../types';
import { formatCurrency } from '../utils/calculations';

interface ItemListProps {
  items: Item[];
  onRemoveItem: (id: string) => void;
}

export const ItemList: React.FC<ItemListProps> = ({ items, onRemoveItem }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 italic text-sm">
        No items added yet
      </div>
    );
  }

  return (
    <ul className="mt-2 space-y-1.5">
      {items.map((item) => (
        <li 
          key={item.id}
          className={`flex items-center justify-between p-2 rounded-md ${
            item.isDeduction 
              ? 'bg-red-50 hover:bg-red-100' 
              : 'bg-gray-50 hover:bg-gray-100'
          } transition-colors duration-150`}
        >
          <div className="flex items-center gap-2">
            <span className={item.isDeduction ? 'text-red-600' : 'text-gray-800'}>
              {item.name}
            </span>
            {item.isDeduction && (
              <span className="text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded">
                Deduction
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className={`font-medium ${item.isDeduction ? 'text-red-600' : 'text-gray-900'}`}>
              {item.isDeduction ? '- ' : ''}{formatCurrency(item.price)}
            </span>
            <button
              onClick={() => onRemoveItem(item.id)}
              className="text-gray-500 hover:text-red-600 focus:outline-none transition-colors duration-200"
              aria-label={`Remove ${item.name}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};