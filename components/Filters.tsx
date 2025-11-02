"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Filter, Users } from "lucide-react";

interface FiltersProps {
  selectedYear: number;
  selectedMonth: string;
  selectedSegment: string;
  years: number[];
  segments: string[];
  onYearChange: (year: number) => void;
  onMonthChange: (month: string) => void;
  onSegmentChange: (segment: string) => void;
}

const MONTHS = [
  "All",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function Filters({
  selectedYear,
  selectedMonth,
  selectedSegment,
  years,
  segments,
  onYearChange,
  onMonthChange,
  onSegmentChange,
}: FiltersProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Year Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => onYearChange(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Month Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => onMonthChange(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {MONTHS.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* Segment Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              Segment
            </label>
            <select
              value={selectedSegment}
              onChange={(e) => onSegmentChange(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="All">All Segments</option>
              {segments.map((segment) => (
                <option key={segment} value={segment}>
                  {segment}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
