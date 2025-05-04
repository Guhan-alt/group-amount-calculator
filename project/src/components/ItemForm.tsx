import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface ItemFormProps {
  onAddItem: (name: string, price: number, isDeduction: boolean) => void;
}

export const ItemForm: React.FC<ItemFormProps> = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [isDeduction, setIsDeduction] = useState(false);
  const [errors, setErrors] = useState({ name: '', price: '' });

  const validateForm = (): boolean => {
    const newErrors = { name: '', price: '' };
    let isValid = true;

    if (name.trim() === '') {
      newErrors.name = 'Item name is required';
      isValid = false;
    }

    const priceValue = parseFloat(price);
    if (price === '' || isNaN(priceValue) || priceValue <= 0) {
      newErrors.price = 'Please enter a valid price greater than 0';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddItem(name.trim(), parseFloat(price), isDeduction);
      setName('');
      setPrice('');
      setIsDeduction(false);
      setErrors({ name: '', price: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value.trim() !== '') 
                setErrors(prev => ({ ...prev, name: '' }));
            }}
            placeholder="Item name"
            className={`w-full px-3 py-1.5 rounded-md border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm transition-all`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name}</p>}
        </div>
        
        <div className="w-full sm:w-1/3">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
            <input
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                if (e.target.value !== '' && !isNaN(parseFloat(e.target.value)) && parseFloat(e.target.value) > 0) 
                  setErrors(prev => ({ ...prev, price: '' }));
              }}
              placeholder="0.00"
              step="0.01"
              min="0.01"
              className={`w-full pl-7 pr-3 py-1.5 rounded-md border ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm transition-all`}
            />
          </div>
          {errors.price && <p className="text-red-500 text-xs mt-0.5">{errors.price}</p>}
        </div>
      </div>

      <div className="flex items-center justify-between mt-1">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={isDeduction}
            onChange={(e) => setIsDeduction(e.target.checked)}
            className="rounded text-red-500 focus:ring-red-500"
          />
          Deduct this amount
        </label>
        
        <button
          type="submit"
          className={`flex items-center justify-center px-3 py-1.5 ${
            isDeduction ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'
          } text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all duration-200`}
        >
          {isDeduction ? (
            <Minus size={16} className="mr-1" />
          ) : (
            <Plus size={16} className="mr-1" />
          )}
          <span>{isDeduction ? 'Deduct Item' : 'Add Item'}</span>
        </button>
      </div>
    </form>
  );
};