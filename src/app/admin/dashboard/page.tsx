import { BarChart, DollarSign, Users, ShoppingCart, LineChart as LucideLineChart } from "lucide-react";
import { PageTitle } from "@/components/shared/PageTitle";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, BarChart as RechartsBarChart } from 'recharts';
import { placeholderSalesData, placeholderUserTrendData, placeholderProductPerformanceData } from "@/lib/placeholder-data";
import type { ChartConfig } from "@/components/ui/chart";

const salesChartConfig = {
  sales: { label: "Sales", color: "hsl(var(--chart-1))" },
  profit: { label: "Profit", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const userChartConfig = {
  newUsers: { label: "New Users", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

const productChartConfig = {
  sales: { label: "Units Sold", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

export default function DashboardPage() {
  return (
    <>
      <PageTitle title="Dashboard" description="Overview of your pizza business." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <DashboardStatCard title="Total Revenue" value="$12,345" icon={DollarSign} description="+20.1% from last month" colorClass="text-green-500" />
        <DashboardStatCard title="Total Orders" value="1,250" icon={ShoppingCart} description="+15% from last month" />
        <DashboardStatCard title="New Customers" value="89" icon={Users} description="+5 since yesterday" colorClass="text-blue-500" />
        <DashboardStatCard title="Average Order Value" value="$19.80" icon={BarChart} description="-2.5% from last month" colorClass="text-orange-500" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Sales & Profit Overview</CardTitle>
            <CardDescription>Monthly sales and profit trends.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={salesChartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={placeholderSalesData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
                  <Bar dataKey="profit" fill="var(--color-profit)" radius={4} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">User Trends</CardTitle>
            <CardDescription>New user registrations over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={userChartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={placeholderUserTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line type="monotone" dataKey="newUsers" stroke="var(--color-newUsers)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Top Product Performance</CardTitle>
          <CardDescription>Sales volume for top performing products.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={productChartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={placeholderProductPerformanceData} layout="vertical">
                <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={8} width={100}/>
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
