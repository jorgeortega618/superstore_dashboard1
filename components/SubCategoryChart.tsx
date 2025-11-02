"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { abbreviateNumber } from "@/lib/utils";

interface SubCategoryData {
  subCategory: string;
  sales: number;
  percentage: number;
}

interface SubCategoryChartProps {
  data: SubCategoryData[];
}

export function SubCategoryChart({ data }: SubCategoryChartProps) {
  const maxSales = Math.max(...data.map((d) => d.sales));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Sales by Sub-Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => {
            const widthPercent = (item.sales / maxSales) * 100;
            return (
              <div key={item.subCategory}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground w-4">
                      {index + 1}.
                    </span>
                    <span className="text-sm font-medium">
                      {item.subCategory}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-primary">
                    {abbreviateNumber(item.sales)}
                  </span>
                </div>
                <div className="relative h-8 bg-secondary rounded-md overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-primary rounded-md transition-all"
                    style={{ width: `${widthPercent}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-end pr-3">
                    <span className="text-xs font-medium text-primary-foreground">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
