import React, { useState } from 'react';
import { Fridge } from './components/Fridge';
import { RecipeDisplay } from './components/RecipeDisplay';
import { type Recipe } from './types';
import { generateRecipe } from './services/geminiService';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>(['Eggs', 'Milk', 'Cheese']);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipe = async () => {
    const ingredientList = ingredients
      .map(item => item.trim())
      .filter(item => item.length > 0);

    if (ingredientList.length === 0) {
      setError("Please enter at least one ingredient.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const generatedRecipe = await generateRecipe(ingredientList);
      setRecipe(generatedRecipe);
    } catch (e) {
      console.error(e);
      setError("Sorry, I couldn't cook up a recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRecipe(null);
    setError(null);
    setIngredients(['Eggs', 'Milk', 'Cheese']);
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white overflow-hidden">
      <main className="container mx-auto p-4 md:p-8 relative z-10">
        <header className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Fridge Chef AI
            </h1>
            <p className="text-neutral-400 mt-2 text-lg">What do you have on hand today?</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <Fridge
            ingredients={ingredients}
            setIngredients={setIngredients}
            onGenerateRecipe={handleGenerateRecipe}
            isLoading={isLoading}
          />
          <RecipeDisplay
            recipe={recipe}
            isLoading={isLoading}
            error={error}
            onReset={handleReset}
          />
        </div>
      </main>
    </div>
  );
};

export default App;