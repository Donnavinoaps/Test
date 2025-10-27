
import { GoogleGenAI, Type } from "@google/genai";
import { type Recipe } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const recipeSchema = {
    type: Type.OBJECT,
    properties: {
        recipeName: { type: Type.STRING, description: 'The name of the recipe.' },
        description: { type: Type.STRING, description: 'A short, appetizing description of the dish.' },
        prepTime: { type: Type.STRING, description: 'Estimated preparation and cooking time (e.g., "30 minutes").' },
        ingredients: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'List of all ingredients required, including quantities. It can include ingredients not in the provided list.',
        },
        instructions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'Step-by-step cooking instructions.',
        },
    },
    required: ["recipeName", "description", "prepTime", "ingredients", "instructions"],
};

export async function generateRecipe(ingredients: string[]): Promise<Recipe> {
    const prompt = `Create a delicious recipe using the following ingredients: ${ingredients.join(', ')}. You can also include common pantry staples. The recipe should be creative and easy to follow. Respond in Italian language.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: recipeSchema,
            },
        });

        const jsonText = response.text.trim();
        const recipeData = JSON.parse(jsonText);
        
        return recipeData as Recipe;
    } catch (error) {
        console.error("Error generating recipe:", error);
        throw new Error("Failed to generate recipe from API.");
    }
}
