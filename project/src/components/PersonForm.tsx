import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface PersonFormProps {
  onAddPerson: (name: string) => void;
}

export const PersonForm: React.FC<PersonFormProps> = ({ onAddPerson }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '') {
      setError('Please enter a name');
      return;
    }
    
    onAddPerson(name.trim());
    setName('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-6">
      <div className="flex-1">
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value.trim() !== '') setError('');
          }}
          placeholder="Enter person's name"
          className={`w-full px-4 py-2 rounded-lg border ${
            error ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      <button
        type="submit"
        className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
      >
        <Plus size={20} className="mr-1" />
        <span>Add Person</span>
      </button>
    </form>
  );
};