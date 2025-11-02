"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface SegmentData {
  segment: string;
  currentYear: number;
  previousYear: number;
  percentage: number;
}

interface SegmentChartProps {
  data: SegmentData[];
}

export function SegmentChart({ data }: SegmentChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Sales by Segment</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" tick={{ fontSize: 12 }} stroke="#6b7280" />
            <YAxis
              dataKey="segment"
              type="category"
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
              formatter={(value: number) => `$${(value / 1000).toFixed(1)}K`}
            />
            <Legend />
            <Bar
              dataKey="currentYear"
              fill="#3b82f6"
              radius={[0, 8, 8, 0]}
              name="Current Year"
            />
            <Bar
              dataKey="previousYear"
              fill="#cbd5e1"
              radius={[0, 8, 8, 0]}
              name="Previous Year"
            />
          </BarChart>
        </ResponsiveContainer>
        
        {/* Percentage indicators */}
        <div className="mt-4 flex justify-around">
          {data.map((item) => (
            <div key={item.segment} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <p className="text-xs font-medium">{item.segment}</p>
              </div>
              <p className="text-lg font-bold">{item.percentage}%</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
