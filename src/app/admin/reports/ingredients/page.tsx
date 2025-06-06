// src/app/admin/reports/ingredients/page.tsx
"use client";

import { useState } from "react";
import { FileText as FileTextIcon, Loader2 } from "lucide-react";
import { PageTitle } from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generateIngredientsReport } from "@/ai/flows/generate-ingredients-report";
import type { GenerateIngredientsReportInput, GenerateIngredientsReportOutput } from "@/ai/flows/generate-ingredients-report";
import { pastSalesJsonExample } from "@/lib/placeholder-data"; // For default value

export default function IngredientsReportPage() {
  const [salesData, setSalesData] = useState<string>(pastSalesJsonExample);
  const [report, setReport] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!salesData.trim()) {
      toast({
        title: "Error",
        description: "Sales data cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    let parsedSalesData;
    try {
      parsedSalesData = JSON.parse(salesData);
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Please provide sales data in valid JSON format.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setReport(null);

    try {
      const input: GenerateIngredientsReportInput = { salesData: JSON.stringify(parsedSalesData) };
      const result: GenerateIngredientsReportOutput = await generateIngredientsReport(input);
      setReport(result.report);
      toast({
        title: "Report Generated",
        description: "Ingredients sales trend report created successfully.",
      });
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        title: "Error Generating Report",
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
        title="Ingredients Sales Report"
        icon={FileTextIcon}
        description="Generate summary reports of sales trends based on ingredient popularity."
      />
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Input Sales Data</CardTitle>
            <CardDescription>
              Provide sales data in JSON format. This data should include order details with ingredients and quantities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="salesData">Sales Data (JSON)</Label>
              <Textarea
                id="salesData"
                value={salesData}
                onChange={(e) => setSalesData(e.target.value)}
                placeholder='[{"orderId": "1", "items": [{"name": "Pepperoni Pizza", "ingredients": ["dough", "sauce", "cheese", "pepperoni"], "quantity": 1}]}]'
                className="min-h-[200px] font-code text-sm"
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Generate Report
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Generated Report</CardTitle>
            <CardDescription>
              Insights into ingredient popularity and sales trends.
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px]">
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2 text-muted-foreground">Generating report...</p>
              </div>
            )}
            {report && !isLoading && (
              <div className="prose prose-sm max-w-none rounded-md border bg-muted/30 p-4 max-h-[400px] overflow-y-auto">
                <pre className="whitespace-pre-wrap break-words font-sans text-sm">{report}</pre>
              </div>
            )}
            {!report && !isLoading && (
              <p className="text-center text-muted-foreground pt-10">
                Your generated report will appear here.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
