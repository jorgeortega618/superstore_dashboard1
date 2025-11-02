"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { abbreviateNumber, formatPercent } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: number;
  change: number;
  trend: number[];
  icon?: React.ReactNode;
}

export function KPICard({ title, value, change, trend, icon }: KPICardProps) {
  const isPositive = change >= 0;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <h3 className="text-3xl font-bold tracking-tight mb-2">
              {abbreviateNumber(value)}
            </h3>
            <div className="flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span
                className={`text-sm font-medium ${
                  isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {formatPercent(change)}
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs PY</span>
            </div>
          </div>
          {icon && (
            <div className="text-primary opacity-20">{icon}</div>
          )}
        </div>
        
        {/* Mini sparkline */}
        <div className="mt-4 h-12 flex items-end gap-0.5">
          {trend.map((val, i) => {
            const maxVal = Math.max(...trend);
            const height = (val / maxVal) * 100;
            return (
              <div
                key={i}
                className="flex-1 bg-primary/20 rounded-sm transition-all hover:bg-primary/40"
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
