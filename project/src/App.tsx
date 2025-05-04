import React, { useState, useEffect } from 'react';
import { Coins, RefreshCw } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { GroupState, Person } from './types';
import { PersonForm } from './components/PersonForm';
import { PersonCard } from './components/PersonCard';
import { TotalSummary } from './components/TotalSummary';
import { useLocalStorage } from './hooks/useLocalStorage';
import { formatCurrency } from './utils/calculations';

function App() {
  const [groupState, setGroupState] = useLocalStorage<GroupState>('group-calculator', { people: [] });
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const addPerson = (name: string) => {
    const newPerson: Person = {
      id: uuidv4(),
      name,
      items: [],
    };
    
    setGroupState(prevState => ({
      ...prevState,
      people: [...prevState.people, newPerson],
    }));
  };

  const removePerson = (id: string) => {
    setGroupState(prevState => ({
      ...prevState,
      people: prevState.people.filter(person => person.id !== id),
    }));
  };

  const addItem = (personId: string, name: string, price: number, isDeduction: boolean) => {
    setGroupState(prevState => ({
      ...prevState,
      people: prevState.people.map(person => {
        if (person.id === personId) {
          return {
            ...person,
            items: [...person.items, { id: uuidv4(), name, price, isDeduction }],
          };
        }
        return person;
      }),
    }));
  };

  const removeItem = (personId: string, itemId: string) => {
    setGroupState(prevState => ({
      ...prevState,
      people: prevState.people.map(person => {
        if (person.id === personId) {
          return {
            ...person,
            items: person.items.filter(item => item.id !== itemId),
          };
        }
        return person;
      }),
    }));
  };

  const resetCalculator = () => {
    setGroupState({ people: [] });
    setShowResetConfirm(false);
  };

  return (
    <div className={`min-h-screen bg-gray-50 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-600 text-white p-3 rounded-full">
              <Coins size={32} />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Group Cost Calculator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Add people to your group, track expenses and deductions, and see the total costs at a glance.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Person</h2>
              <PersonForm onAddPerson={addPerson} />
              
              <div className="flex justify-end mt-4">
                {showResetConfirm ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-red-600">Are you sure?</span>
                    <button
                      onClick={resetCalculator}
                      className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                    >
                      Yes, reset
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="px-3 py-1.5 bg-gray-200 text-gray-800 text-sm rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="flex items-center text-sm text-gray-600 hover:text-red-600 transition-colors"
                    disabled={groupState.people.length === 0}
                  >
                    <RefreshCw size={14} className="mr-1" />
                    Reset calculator
                  </button>
                )}
              </div>
            </div>

            {groupState.people.length > 0 ? (
              <div className="space-y-4">
                {groupState.people.map(person => (
                  <PersonCard
                    key={person.id}
                    person={person}
                    onAddItem={addItem}
                    onRemoveItem={removeItem}
                    onRemovePerson={removePerson}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <p className="text-gray-500">
                  No people added yet. Add someone to get started!
                </p>
              </div>
            )}
          </div>

          <div className="lg:row-start-1 lg:col-start-3">
            <div className="sticky top-6">
              <TotalSummary people={groupState.people} />
              
              {groupState.people.length > 0 && (
                <div className="mt-6 bg-white p-5 rounded-xl shadow-md">
                  <h3 className="font-semibold text-gray-800 mb-3">Per Person Breakdown</h3>
                  <ul className="space-y-2">
                    {groupState.people.map(person => {
                      const total = person.items.reduce((sum, item) => 
                        sum + (item.price * (item.isDeduction ? -1 : 1)), 0);
                      return (
                        <li key={person.id} className="flex justify-between items-center p-2 rounded hover:bg-gray-50">
                          <span className="text-gray-800">{person.name}</span>
                          <span className={`font-medium ${total < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                            {formatCurrency(total)}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;