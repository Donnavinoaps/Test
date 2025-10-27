import React from 'react';
import { type Recipe } from '../types';
import { ChefHatIcon, ClockIcon, ResetIcon } from './Icons';

interface RecipeDisplayProps {
  recipe: Recipe | null;
  isLoading: boolean;
  error: string | null;
  onReset: () => void;
}

const SkeletonLoader: React.FC = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-8 bg-slate-700 rounded-md w-3/4"></div>
    <div className="h-4 bg-slate-700 rounded-md w-full"></div>
    <div className="h-4 bg-slate-700 rounded-md w-5/6"></div>
    <div className="space-y-4 pt-4">
      <div className="h-6 bg-slate-700 rounded-md w-1/3"></div>
      <div className="h-4 bg-slate-700 rounded-md w-full"></div>
      <div className="h-4 bg-slate-700 rounded-md w-full"></div>
      <div className="h-4 bg-slate-700 rounded-md w-2/3"></div>
    </div>
     <div className="space-y-4 pt-4">
      <div className="h-6 bg-slate-700 rounded-md w-1/3"></div>
      <div className="h-4 bg-slate-700 rounded-md w-full"></div>
      <div className="h-4 bg-slate-700 rounded-md w-full"></div>
      <div className="h-4 bg-slate-700 rounded-md w-4/5"></div>
    </div>
  </div>
);

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, isLoading, error, onReset }) => {
  const renderContent = () => {
    if (isLoading) {
      return <div className="flex flex-col justify-center h-full"><SkeletonLoader /></div>;
    }
    if (error) {
      return <div className="flex flex-col justify-center h-full"><p className="text-center text-red-400 text-lg">{error}</p></div>;
    }
    if (recipe) {
      return (
        <div className="flex flex-col h-full text-slate-200">
          <div className="flex-grow overflow-y-auto pr-4">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">{recipe.recipeName}</h2>
            <p className="text-slate-400 mb-6 text-lg">{recipe.description}</p>
            
            <div className="flex items-center gap-4 text-slate-300 mb-6 border-y border-slate-700 py-3">
                <ClockIcon className="w-6 h-6 text-cyan-400"/>
                <span className="font-medium">{recipe.prepTime}</span>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3 text-slate-100">Ingredients</h3>
              <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300">
                {recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </div>
            
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-3 text-slate-100">Instructions</h3>
              <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 leading-relaxed">
                {recipe.instructions.map((step, index) => <li key={index}>{step}</li>)}
              </ol>
            </div>
          </div>
          <div className="mt-auto pt-6">
            <button
              onClick={onReset}
              className="w-full flex items-center justify-center gap-2 bg-slate-700/50 text-slate-300 font-semibold py-2 px-4 rounded-lg border-2 border-slate-600 hover:border-red-500 hover:text-white transition-colors duration-300"
            >
              <ResetIcon className="w-5 h-5" />
              Crea un'altra ricetta
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
        <ChefHatIcon className="w-24 h-24 mb-4 text-slate-600" />
        <h3 className="text-2xl font-bold text-slate-300">Your recipe will appear here</h3>
        <p className="max-w-sm mt-2">Select some ingredients from your fridge and let our AI chef create something amazing for you!</p>
      </div>
    );
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 md:p-8 min-h-[500px] lg:min-h-full flex flex-col">
      {renderContent()}
    </div>
  );
};