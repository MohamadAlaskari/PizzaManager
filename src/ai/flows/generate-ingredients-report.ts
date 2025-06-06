// src/ai/flows/generate-ingredients-report.ts
'use server';

/**
 * @fileOverview Generates summary reports of sales trends based on ingredient popularity.
 *
 * - generateIngredientsReport - A function that handles the generation of ingredient sales trend reports.
 * - GenerateIngredientsReportInput - The input type for the generateIngredientsReport function.
 * - GenerateIngredientsReportOutput - The return type for the generateIngredientsReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateIngredientsReportInputSchema = z.object({
  salesData: z
    .string()
    .describe(
      'Sales data in JSON format, including order details with ingredients and quantities.'
    ),
});
export type GenerateIngredientsReportInput = z.infer<
  typeof GenerateIngredientsReportInputSchema
>;

const GenerateIngredientsReportOutputSchema = z.object({
  report: z.string().describe('A summary report of sales trends by ingredient.'),
});
export type GenerateIngredientsReportOutput = z.infer<
  typeof GenerateIngredientsReportOutputSchema
>;

export async function generateIngredientsReport(
  input: GenerateIngredientsReportInput
): Promise<GenerateIngredientsReportOutput> {
  return generateIngredientsReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateIngredientsReportPrompt',
  input: {schema: GenerateIngredientsReportInputSchema},
  output: {schema: GenerateIngredientsReportOutputSchema},
  prompt: `You are an expert data analyst specializing in pizza sales trends.

  Analyze the provided sales data to generate a summary report highlighting the popularity of different ingredients. Identify top-selling ingredients, any notable trends, and provide insights that can help optimize menu offerings and procurement strategies.

  Sales Data: {{{salesData}}}
  \n  Format the output as a concise and readable report.
  `,
});

const generateIngredientsReportFlow = ai.defineFlow(
  {
    name: 'generateIngredientsReportFlow',
    inputSchema: GenerateIngredientsReportInputSchema,
    outputSchema: GenerateIngredientsReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
