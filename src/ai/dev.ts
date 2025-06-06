import { config } from 'dotenv';
config();

import '@/ai/flows/predict-ingredient-demand.ts';
import '@/ai/flows/generate-ingredients-report.ts';