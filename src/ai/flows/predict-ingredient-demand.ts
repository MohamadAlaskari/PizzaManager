// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Predicts ingredient demand for the next week to optimize procurement and reduce waste.
 *
 * - predictIngredientDemand - A function that handles the ingredient demand prediction process.
 * - PredictIngredientDemandInput - The input type for the predictIngredientDemand function.
 * - PredictIngredientDemandOutput - The return type for the predictIngredientDemand function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictIngredientDemandInputSchema = z.object({
  pastSalesData: z
    .string()
    .describe(
      'Historical sales data for the past year, including date, pizza type, and ingredients used.'
    ),
  currentInventoryLevels: z
    .string()
    .describe('Current inventory levels for each ingredient.'),
  upcomingPromotions: z
    .string()
    .optional()
    .describe('Details of any upcoming promotions or special events.'),
});
export type PredictIngredientDemandInput = z.infer<
  typeof PredictIngredientDemandInputSchema
>;

const PredictIngredientDemandOutputSchema = z.object({
  ingredientDemandForecast: z
    .string()
    .describe(
      'A forecast of ingredient demand for the next week, including specific quantities needed for each ingredient.'
    ),
  potentialShortages: z
    .string()
    .optional()
    .describe(
      'A list of ingredients that may be in short supply based on the demand forecast.'
    ),
  procurementRecommendations: z
    .string()
    .optional()
    .describe(
      'Recommendations for adjusting procurement based on the demand forecast and potential shortages.'
    ),
});
export type PredictIngredientDemandOutput = z.infer<
  typeof PredictIngredientDemandOutputSchema
>;

export async function predictIngredientDemand(
  input: PredictIngredientDemandInput
): Promise<PredictIngredientDemandOutput> {
  return predictIngredientDemandFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictIngredientDemandPrompt',
  input: {schema: PredictIngredientDemandInputSchema},
  output: {schema: PredictIngredientDemandOutputSchema},
  prompt: `You are an AI assistant that helps pizza restaurant administrators predict ingredient demand for the next week.

  Analyze the provided data to forecast ingredient demand, identify potential shortages, and provide procurement recommendations.

  Past Sales Data: {{{pastSalesData}}}
  Current Inventory Levels: {{{currentInventoryLevels}}}
  Upcoming Promotions: {{{upcomingPromotions}}}

  Provide your response in a structured format, including ingredient demand forecast, potential shortages, and procurement recommendations, so it can be easily used by the administrator.
  Remember that the output must conform to the schema.
  `,
});

const predictIngredientDemandFlow = ai.defineFlow(
  {
    name: 'predictIngredientDemandFlow',
    inputSchema: PredictIngredientDemandInputSchema,
    outputSchema: PredictIngredientDemandOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
