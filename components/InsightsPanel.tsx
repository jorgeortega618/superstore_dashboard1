"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingUp, AlertCircle, Award } from "lucide-react";

interface Insight {
  type: "positive" | "negative" | "neutral" | "highlight";
  title: string;
  description: string;
}

interface InsightsPanelProps {
  insights: Insight[];
}

const iconMap = {
  positive: TrendingUp,
  negative: AlertCircle,
  neutral: Lightbulb,
  highlight: Award,
};

const colorMap = {
  positive: "text-green-600 bg-green-50",
  negative: "text-red-600 bg-red-50",
  neutral: "text-blue-600 bg-blue-50",
  highlight: "text-amber-600 bg-amber-50",
};

export function InsightsPanel({ insights }: InsightsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Key Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.map((insight, index) => {
            const Icon = iconMap[insight.type];
            const colorClass = colorMap[insight.type];
            
            return (
              <div
                key={index}
                className="flex gap-3 p-3 rounded-lg border bg-card hover:shadow-md transition-shadow"
              >
                <div className={`p-2 rounded-lg h-fit ${colorClass}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {insight.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
