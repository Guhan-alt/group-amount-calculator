import { Person } from '../types';

export const calculatePersonTotal = (person: Person): number => {
  return person.items.reduce((total, item) => total + (item.price * (item.isDeduction ? -1 : 1)), 0);
};

export const calculateGrandTotal = (people: Person[]): number => {
  return people.reduce((total, person) => total + calculatePersonTotal(person), 0);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);
};