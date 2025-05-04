import React from 'react';
import { DollarSign, Users } from 'lucide-react';
import { Person } from '../types';
import { calculateGrandTotal, formatCurrency } from '../utils/calculations';

interface TotalSummaryProps {
  people: Person[];
}

export const TotalSummary: React.FC<TotalSummaryProps> = ({ people }) => {
  const grandTotal = calculateGrandTotal(people);
  const totalItems = people.reduce((sum, person) => sum + person.items.length, 0);
  
  const totalExpenses = people.reduce((sum, person) => 
    sum + person.items.filter(item => !item.isDeduction)
      .reduce((itemSum, item) => itemSum + item.price, 0), 0);
  
  const totalDeductions = people.reduce((sum, person) => 
    sum + person.items.filter(item => item.isDeduction)
      .reduce((itemSum, item) => itemSum + item.price, 0), 0);
  
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-xl shadow-lg overflow-hidden text-white p-5">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <DollarSign className="mr-2" size={22} />
        Summary
      </h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-indigo-400">
          <div className="flex items-center">
            <Users className="mr-2" size={18} />
            <span>People</span>
          </div>
          <span className="font-semibold">{people.length}</span>
        </div>
        
        <div className="flex justify-between items-center pb-2 border-b border-indigo-400">
          <span>Total Items</span>
          <span className="font-semibold">{totalItems}</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>Total Expenses</span>
            <span className="font-semibold">{formatCurrency(totalExpenses)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Total Deductions</span>
            <span className="font-semibold text-red-300">- {formatCurrency(totalDeductions)}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-indigo-400">
          <span className="text-lg">Net Total</span>
          <span className="text-2xl font-bold">{formatCurrency(grandTotal)}</span>
        </div>
      </div>
    </div>
  );
};