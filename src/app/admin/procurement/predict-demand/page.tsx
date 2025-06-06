// src/app/admin/procurement/predict-demand/page.tsx
"use client";

import { useState } from "react";
import { Brain as BrainIcon, Loader2, PackageIcon } from "lucide-react";
import { PageTitle } from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { predictIngredientDemand } from "@/ai/flows/predict-ingredient-demand";
import type { PredictIngredientDemandInput, PredictIngredientDemandOutput } from "@/ai/flows/predict-ingredient-demand";
import { pastSalesJsonExample, currentInventoryJsonExample } from "@/lib/placeholder-data"; // For default values

export default function PredictDemandPage() {
  const [pastSalesData, setPastSalesData] = useState<string>(pastSalesJsonExample);
  const [currentInventoryLevels, setCurrentInventoryLevels] = useState<string>(currentInventoryJsonExample);
  const [upcomingPromotions, setUpcomingPromotions] = useState<string>("");
  const [predictionResult, setPredictionResult] = useState<PredictIngredientDemandOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!pastSalesData.trim() || !currentInventoryLevels.trim()) {
      toast({
        title: "Error",
        description: "Past sales data and current inventory levels are required.",
        variant: "destructive",
      });
      return;
    }

    let parsedPastSales, parsedInventory;
    try {
      parsedPastSales = JSON.parse(pastSalesData);
      parsedInventory = JSON.parse(currentInventoryLevels);
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Please ensure Past Sales Data and Current Inventory Levels are valid JSON.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setPredictionResult(null);

    try {
      const input: PredictIngredientDemandInput = {
        pastSalesData: JSON.stringify(parsedPastSales),
        currentInventoryLevels: JSON.stringify(parsedInventory),
        upcomingPromotions: upcomingPromotions.trim() || undefined,
      };
      const result = await predictIngredientDemand(input);
      setPredictionResult(result);
      toast({
        title: "Prediction Complete",
        description: "Ingredient demand forecast generated successfully.",
      });
    } catch (error) {
      console.error("Error predicting demand:", error);
      toast({
        title: "Error Predicting Demand",
        description: (error as Error).message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageTitle
        title="Predict Ingredient Demand"
        icon={BrainIcon}
        description="AI-powered tool to forecast ingredient needs and optimize procurement."
      />
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle>Input Data for Prediction</CardTitle>
            <CardDescription>
              Provide the necessary data for the AI to generate a demand forecast.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="pastSalesData">Past Sales Data (JSON)</Label>
              <Textarea
                id="pastSalesData"
                value={pastSalesData}
                onChange={(e) => setPastSalesData(e.target.value)}
                placeholder="Historical sales data..."
                className="min-h-[150px] font-code text-sm"
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="currentInventoryLevels">Current Inventory Levels (JSON)</Label>
              <Textarea
                id="currentInventoryLevels"
                value={currentInventoryLevels}
                onChange={(e) => setCurrentInventoryLevels(e.target.value)}
                placeholder="Current stock for each ingredient..."
                className="min-h-[100px] font-code text-sm"
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="upcomingPromotions">Upcoming Promotions (Optional)</Label>
              <Input
                id="upcomingPromotions"
                value={upcomingPromotions}
                onChange={(e) => setUpcomingPromotions(e.target.value)}
                placeholder="e.g., 'Weekend BOGO on Pepperoni Pizzas'"
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Predict Demand
            </Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle>Prediction Results</CardTitle>
            <CardDescription>
              Forecasted demand, potential shortages, and procurement recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[300px]">
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2 text-muted-foreground">Generating prediction...</p>
              </div>
            )}
            {predictionResult && !isLoading && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center">
                    <PackageIcon className="h-5 w-5 mr-2 text-primary"/> Ingredient Demand Forecast
                  </h3>
                  <div className="prose prose-sm max-w-none rounded-md border bg-muted/30 p-4">
                    <pre className="whitespace-pre-wrap break-words font-sans text-sm">{predictionResult.ingredientDemandForecast}</pre>
                  </div>
                </div>
                {predictionResult.potentialShortages && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center">
                      <PackageIcon className="h-5 w-5 mr-2 text-orange-500"/> Potential Shortages
                    </h3>
                    <div className="prose prose-sm max-w-none rounded-md border bg-muted/30 p-4">
                       <pre className="whitespace-pre-wrap break-words font-sans text-sm">{predictionResult.potentialShortages}</pre>
                    </div>
                  </div>
                )}
                {predictionResult.procurementRecommendations && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center">
                       <PackageIcon className="h-5 w-5 mr-2 text-green-500"/> Procurement Recommendations
                    </h3>
                     <div className="prose prose-sm max-w-none rounded-md border bg-muted/30 p-4">
                       <pre className="whitespace-pre-wrap break-words font-sans text-sm">{predictionResult.procurementRecommendations}</pre>
                    </div>
                  </div>
                )}
              </div>
            )}
            {!predictionResult && !isLoading && (
              <p className="text-center text-muted-foreground pt-10">
                Your demand prediction will appear here.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
