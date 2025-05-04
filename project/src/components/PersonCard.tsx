import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { Person } from '../types';
import { ItemForm } from './ItemForm';
import { ItemList } from './ItemList';
import { calculatePersonTotal, formatCurrency } from '../utils/calculations';

interface PersonCardProps {
  person: Person;
  onAddItem: (personId: string, name: string, price: number, isDeduction: boolean) => void;
  onRemoveItem: (personId: string, itemId: string) => void;
  onRemovePerson: (id: string) => void;
}

export const PersonCard: React.FC<PersonCardProps> = ({
  person,
  onAddItem,
  onRemoveItem,
  onRemovePerson,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const total = calculatePersonTotal(person);

  const expenses = person.items.filter(item => !item.isDeduction)
    .reduce((sum, item) => sum + item.price, 0);
  const deductions = person.items.filter(item => item.isDeduction)
    .reduce((sum, item) => sum + item.price, 0);

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg"
      style={{ animationFillMode: 'forwards' }}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {person.name}
            </h3>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {person.items.length} {person.items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => onRemovePerson(person.id)}
              className="p-1 text-gray-500 hover:text-red-600 focus:outline-none transition-colors duration-200"
              aria-label={`Remove ${person.name}`}
            >
              <Trash2 size={18} />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-gray-500 hover:text-indigo-600 focus:outline-none transition-colors duration-200"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>
        
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Expenses</span>
            <span className="text-gray-900">{formatCurrency(expenses)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Deductions</span>
            <span className="text-red-600">- {formatCurrency(deductions)}</span>
          </div>
          <div className="flex items-center justify-between mt-1 pt-2 border-t">
            <span className="font-medium">Net Total</span>
            <span className={`font-semibold text-lg ${total < 0 ? 'text-red-600' : 'text-gray-900'}`}>
              {formatCurrency(total)}
            </span>
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-3 border-t pt-3">
            <ItemList 
              items={person.items} 
              onRemoveItem={(itemId) => onRemoveItem(person.id, itemId)} 
            />
            <div className="mt-3">
              <ItemForm onAddItem={(name, price, isDeduction) => onAddItem(person.id, name, price, isDeduction)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};