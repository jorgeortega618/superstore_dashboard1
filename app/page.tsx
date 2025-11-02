"use client";

import { useState, useEffect, useMemo } from "react";
import { KPICard } from "@/components/KPICard";
import { KPICardPercent } from "@/components/KPICardPercent";
import { USMap } from "@/components/USMap";
import { CategoryChart } from "@/components/CategoryChart";
import { SegmentChart } from "@/components/SegmentChart";
import { SubCategoryChart } from "@/components/SubCategoryChart";
import { Filters } from "@/components/Filters";
import { InsightsPanel } from "@/components/InsightsPanel";
import { DollarSign, ShoppingCart, Users, Package, Percent } from "lucide-react";

interface DataRow {
  "Order Date"?: string;
  "Ship Date"?: string;
  Sales?: number;
  Profit?: number;
  Quantity?: number;
  Category?: string;
  "Sub-Category"?: string;
  Segment?: string;
  State?: string;
  [key: string]: any;
}

export default function Dashboard() {
  const [data, setData] = useState<DataRow[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(2022);
  const [selectedMonth, setSelectedMonth] = useState<string>("All");
  const [selectedSegment, setSelectedSegment] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/data.json")
      .then((res) => res.json())
      .then((jsonData) => {
        // Pre-process dates once for better performance
        const processedData = jsonData.map((row: DataRow) => ({
          ...row,
          _orderDate: row["Order Date"] ? new Date(row["Order Date"]) : null,
          _year: row["Order Date"] ? new Date(row["Order Date"]).getFullYear() : null,
          _month: row["Order Date"] ? new Date(row["Order Date"]).getMonth() : null,
        }));
        setData(processedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setLoading(false);
      });
  }, []);

  // Extract unique years and segments
  const years = useMemo(() => {
    const yearSet = new Set<number>();
    data.forEach((row) => {
      if (row._year) yearSet.add(row._year);
    });
    return Array.from(yearSet).sort((a, b) => b - a);
  }, [data]);

  const segments = useMemo(() => {
    const segmentSet = new Set<string>();
    data.forEach((row) => {
      if (row.Segment) segmentSet.add(row.Segment);
    });
    return Array.from(segmentSet).sort();
  }, [data]);

  // Filter data based on selections (optimized)
  const filteredData = useMemo(() => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    
    return data.filter((row) => {
      if (!row._year) return false;

      const yearMatch = row._year === selectedYear;
      const monthMatch = selectedMonth === "All" || 
        (row._month !== null && monthNames[row._month] === selectedMonth);
      const segmentMatch = selectedSegment === "All" || row.Segment === selectedSegment;

      return yearMatch && monthMatch && segmentMatch;
    });
  }, [data, selectedYear, selectedMonth, selectedSegment]);

  // Calculate previous year data for comparison (optimized)
  const previousYearData = useMemo(() => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    
    return data.filter((row) => {
      if (!row._year) return false;

      const yearMatch = row._year === selectedYear - 1;
      const monthMatch = selectedMonth === "All" || 
        (row._month !== null && monthNames[row._month] === selectedMonth);
      const segmentMatch = selectedSegment === "All" || row.Segment === selectedSegment;

      return yearMatch && monthMatch && segmentMatch;
    });
  }, [data, selectedYear, selectedMonth, selectedSegment]);

  // Calculate KPIs
  const kpis = useMemo(() => {
    const currentSales = filteredData.reduce((sum, row) => sum + (row.Sales || 0), 0);
    const currentProfit = filteredData.reduce((sum, row) => sum + (row.Profit || 0), 0);
    const currentOrders = new Set(filteredData.map((row) => row["Order ID"])).size;
    const currentQuantity = filteredData.reduce((sum, row) => sum + (row.Quantity || 0), 0);

    const prevSales = previousYearData.reduce((sum, row) => sum + (row.Sales || 0), 0);
    const prevProfit = previousYearData.reduce((sum, row) => sum + (row.Profit || 0), 0);
    const prevOrders = new Set(previousYearData.map((row) => row["Order ID"])).size;
    const prevQuantity = previousYearData.reduce((sum, row) => sum + (row.Quantity || 0), 0);

    const salesChange = prevSales ? ((currentSales - prevSales) / prevSales) * 100 : 0;
    const profitChange = prevProfit ? ((currentProfit - prevProfit) / prevProfit) * 100 : 0;
    const ordersChange = prevOrders ? ((currentOrders - prevOrders) / prevOrders) * 100 : 0;
    const quantityChange = prevQuantity ? ((currentQuantity - prevQuantity) / prevQuantity) * 100 : 0;

    // Calculate Profit Margin
    const currentProfitMargin = currentSales ? (currentProfit / currentSales) * 100 : 0;
    const prevProfitMargin = prevSales ? (prevProfit / prevSales) * 100 : 0;
    const profitMarginChange = prevProfitMargin ? currentProfitMargin - prevProfitMargin : 0;

    // Generate trend data (last 12 months) - Optimized
    const generateTrend = (metric: "sales" | "profit" | "orders" | "quantity" | "profitMargin") => {
      const trend: number[] = [];
      const currentMonth = new Date().getMonth();
      
      for (let i = 11; i >= 0; i--) {
        const targetDate = new Date(selectedYear, currentMonth - i, 1);
        const targetYear = targetDate.getFullYear();
        const targetMonth = targetDate.getMonth();
        
        let value = 0;
        let monthSales = 0;
        let monthProfit = 0;
        const orderIds = new Set<string>();
        
        // Single pass through data
        for (const row of data) {
          if (row._year === targetYear && row._month === targetMonth) {
            if (metric === "sales") {
              value += row.Sales || 0;
            } else if (metric === "profit") {
              value += row.Profit || 0;
            } else if (metric === "profitMargin") {
              monthSales += row.Sales || 0;
              monthProfit += row.Profit || 0;
            } else if (metric === "orders") {
              if (row["Order ID"]) orderIds.add(row["Order ID"]);
            } else {
              value += row.Quantity || 0;
            }
          }
        }
        
        if (metric === "orders") {
          trend.push(orderIds.size);
        } else if (metric === "profitMargin") {
          trend.push(monthSales ? (monthProfit / monthSales) * 100 : 0);
        } else {
          trend.push(value);
        }
      }
      return trend;
    };

    return {
      sales: {
        value: currentSales,
        change: salesChange,
        trend: generateTrend("sales"),
      },
      profit: {
        value: currentProfit,
        change: profitChange,
        trend: generateTrend("profit"),
      },
      orders: {
        value: currentOrders,
        change: ordersChange,
        trend: generateTrend("orders"),
      },
      quantity: {
        value: currentQuantity,
        change: quantityChange,
        trend: generateTrend("quantity"),
      },
      profitMargin: {
        value: currentProfitMargin,
        change: profitMarginChange,
        trend: generateTrend("profitMargin"),
      },
    };
  }, [filteredData, previousYearData, data, selectedYear]);

  // Calculate state data for map
  const stateData = useMemo(() => {
    const stateMap = new Map<string, number>();
    filteredData.forEach((row) => {
      if (row.State) {
        const current = stateMap.get(row.State) || 0;
        stateMap.set(row.State, current + (row.Sales || 0));
      }
    });

    return Array.from(stateMap.entries())
      .map(([state, sales]) => ({ state, sales }))
      .sort((a, b) => b.sales - a.sales);
  }, [filteredData]);

  // Calculate category data
  const categoryData = useMemo(() => {
    const categoryMap = new Map<string, { current: number; previous: number }>();
    
    filteredData.forEach((row) => {
      if (row.Category) {
        const data = categoryMap.get(row.Category) || { current: 0, previous: 0 };
        data.current += row.Sales || 0;
        categoryMap.set(row.Category, data);
      }
    });

    previousYearData.forEach((row) => {
      if (row.Category) {
        const data = categoryMap.get(row.Category) || { current: 0, previous: 0 };
        data.previous += row.Sales || 0;
        categoryMap.set(row.Category, data);
      }
    });

    return Array.from(categoryMap.entries())
      .map(([category, { current, previous }]) => ({
        category,
        sales: current,
        change: previous ? ((current - previous) / previous) * 100 : 0,
      }))
      .sort((a, b) => b.sales - a.sales);
  }, [filteredData, previousYearData]);

  // Calculate segment data
  const segmentData = useMemo(() => {
    const segmentMap = new Map<string, { current: number; previous: number }>();
    
    filteredData.forEach((row) => {
      if (row.Segment) {
        const data = segmentMap.get(row.Segment) || { current: 0, previous: 0 };
        data.current += row.Sales || 0;
        segmentMap.set(row.Segment, data);
      }
    });

    previousYearData.forEach((row) => {
      if (row.Segment) {
        const data = segmentMap.get(row.Segment) || { current: 0, previous: 0 };
        data.previous += row.Sales || 0;
        segmentMap.set(row.Segment, data);
      }
    });

    const totalSales = filteredData.reduce((sum, row) => sum + (row.Sales || 0), 0);

    return Array.from(segmentMap.entries())
      .map(([segment, { current, previous }]) => ({
        segment,
        currentYear: current,
        previousYear: previous,
        percentage: totalSales ? Math.round((current / totalSales) * 100) : 0,
      }))
      .sort((a, b) => b.currentYear - a.currentYear);
  }, [filteredData, previousYearData]);

  // Calculate sub-category data
  const subCategoryData = useMemo(() => {
    const subCategoryMap = new Map<string, number>();
    
    filteredData.forEach((row) => {
      if (row["Sub-Category"]) {
        const current = subCategoryMap.get(row["Sub-Category"]) || 0;
        subCategoryMap.set(row["Sub-Category"], current + (row.Sales || 0));
      }
    });

    const totalSales = filteredData.reduce((sum, row) => sum + (row.Sales || 0), 0);

    return Array.from(subCategoryMap.entries())
      .map(([subCategory, sales]) => ({
        subCategory,
        sales,
        percentage: totalSales ? Math.round((sales / totalSales) * 100) : 0,
      }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 10);
  }, [filteredData]);

  // Generate insights
  const insights = useMemo(() => {
    const insights: Array<{
      type: "positive" | "negative" | "neutral" | "highlight";
      title: string;
      description: string;
    }> = [];

    // Sales growth insight
    if (kpis.sales.change > 10) {
      insights.push({
        type: "positive",
        title: "Strong Sales Growth",
        description: `Sales increased by ${kpis.sales.change.toFixed(1)}% compared to last year, indicating strong market performance.`,
      });
    } else if (kpis.sales.change < -5) {
      insights.push({
        type: "negative",
        title: "Sales Decline",
        description: `Sales decreased by ${Math.abs(kpis.sales.change).toFixed(1)}% compared to last year. Review market conditions and strategies.`,
      });
    }

    // Top category insight
    if (categoryData.length > 0) {
      const topCategory = categoryData[0];
      insights.push({
        type: "highlight",
        title: `${topCategory.category} Leading Category`,
        description: `${topCategory.category} generates the highest revenue with ${topCategory.change >= 0 ? '+' : ''}${topCategory.change.toFixed(1)}% YoY growth.`,
      });
    }

    // Top state insight
    if (stateData.length > 0) {
      const topState = stateData[0];
      insights.push({
        type: "neutral",
        title: `${topState.state} Top Performing State`,
        description: `${topState.state} leads in sales performance. Consider expanding operations in this region.`,
      });
    }

    // Profit margin insight
    const profitMargin = kpis.sales.value ? (kpis.profit.value / kpis.sales.value) * 100 : 0;
    if (profitMargin < 5) {
      insights.push({
        type: "negative",
        title: "Low Profit Margin",
        description: `Current profit margin is ${profitMargin.toFixed(1)}%. Consider cost optimization strategies.`,
      });
    } else if (profitMargin > 15) {
      insights.push({
        type: "positive",
        title: "Healthy Profit Margin",
        description: `Profit margin of ${profitMargin.toFixed(1)}% indicates efficient operations and pricing.`,
      });
    }

    return insights;
  }, [kpis, categoryData, stateData]);

  if (loading || data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-foreground mb-2">Loading Superstore Dashboard</p>
          <p className="text-sm text-muted-foreground">Processing 9,994 rows of data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Superstore Sales Overview
            </h1>
            <p className="text-muted-foreground mt-1">
              Last updated: {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold">
              {selectedYear}
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredData.length.toLocaleString()} records
            </div>
          </div>
        </div>

        {/* Filters */}
        <Filters
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedSegment={selectedSegment}
          years={years}
          segments={segments}
          onYearChange={setSelectedYear}
          onMonthChange={setSelectedMonth}
          onSegmentChange={setSelectedSegment}
        />

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <KPICard
            title="Total Sales"
            value={kpis.sales.value}
            change={kpis.sales.change}
            trend={kpis.sales.trend}
            icon={<DollarSign className="h-8 w-8" />}
          />
          <KPICard
            title="Total Profit"
            value={kpis.profit.value}
            change={kpis.profit.change}
            trend={kpis.profit.trend}
            icon={<ShoppingCart className="h-8 w-8" />}
          />
          <KPICardPercent
            title="Profit Margin"
            value={kpis.profitMargin.value}
            change={kpis.profitMargin.change}
            trend={kpis.profitMargin.trend}
            icon={<Percent className="h-8 w-8" />}
          />
          <KPICard
            title="Orders"
            value={kpis.orders.value}
            change={kpis.orders.change}
            trend={kpis.orders.trend}
            icon={<Package className="h-8 w-8" />}
          />
          <KPICard
            title="Quantity Sold"
            value={kpis.quantity.value}
            change={kpis.quantity.change}
            trend={kpis.quantity.trend}
            icon={<Users className="h-8 w-8" />}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <USMap data={stateData} />
          <CategoryChart data={categoryData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SegmentChart data={segmentData} />
          <SubCategoryChart data={subCategoryData} />
        </div>

        {/* Insights */}
        <InsightsPanel insights={insights} />

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground py-6">
          <p>© 2024 Superstore Analytics Dashboard. Built with Next.js & Vercel.</p>
        </div>
      </div>
    </div>
  );
}
