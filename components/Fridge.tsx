import React, { useRef, useEffect } from 'react';
import { PlusIcon, SparklesIcon, TrashIcon } from './Icons';

interface FridgeProps {
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
  onGenerateRecipe: () => void;
  isLoading: boolean;
}

export const Fridge: React.FC<FridgeProps> = ({
  ingredients,
  setIngredients,
  onGenerateRecipe,
  isLoading
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const justAdded = useRef(false);

  useEffect(() => {
    if (justAdded.current && listRef.current) {
      const lastInput = listRef.current.querySelector<HTMLInputElement>(`input[data-index="${ingredients.length - 1}"]`);
      if (lastInput) {
        lastInput.focus();
      }
      justAdded.current = false;
    }
  }, [ingredients.length]);

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    justAdded.current = true;
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index === ingredients.length - 1) {
        handleAddIngredient();
      } else {
        const nextInput = listRef.current?.querySelector<HTMLInputElement>(`input[data-index="${index + 1}"]`);
        nextInput?.focus();
      }
    }
  };

  const hasIngredients = ingredients.some(ingredient => ingredient.trim() !== '');

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 md:p-8 flex flex-col gap-6 h-full">
      <h2 className="text-2xl font-bold text-slate-100">What's in your fridge?</h2>
      
      <div ref={listRef} className="flex-grow flex flex-col gap-3 overflow-y-auto pr-2">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-center gap-2 group">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              data-index={index}
              placeholder="e.g., chicken breast"
              className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-md px-3 py-2 border-2 border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
              aria-label={`Ingredient ${index + 1}`}
            />
            <button
              onClick={() => handleRemoveIngredient(index)}
              className="p-2 text-slate-400 hover:text-red-400 rounded-md transition-colors opacity-50 group-hover:opacity-100"
              aria-label={`Remove ingredient ${index + 1}`}
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
      
      <div className='flex flex-col gap-4'>
        <button
          onClick={handleAddIngredient}
          className="w-full flex items-center justify-center gap-2 bg-slate-700/50 text-slate-300 font-semibold py-2 px-4 rounded-lg border-2 border-slate-600 hover:border-cyan-500 hover:text-white transition-colors duration-300"
        >
          <PlusIcon className="w-5 h-5" />
          Aggiungi ingrediente
        </button>
        <button 
          onClick={onGenerateRecipe}
          disabled={isLoading || !hasIngredients}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100"
        >
          {isLoading ? 'Cooking...' : 'Generate Recipe'}
          <SparklesIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};