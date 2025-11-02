"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { abbreviateNumber, formatCurrency } from "@/lib/utils";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

interface StateData {
  state: string;
  sales: number;
}

interface USMapProps {
  data: StateData[];
}

export function USMap({ data }: USMapProps) {
  const [tooltipContent, setTooltipContent] = useState<{
    state: string;
    sales: number;
    x: number;
    y: number;
  } | null>(null);

  const maxSales = Math.max(...data.map((d) => d.sales));

  const getColor = (sales: number) => {
    const intensity = sales / maxSales;
    if (intensity > 0.7) return "#3b82f6";
    if (intensity > 0.4) return "#60a5fa";
    if (intensity > 0.2) return "#93c5fd";
    return "#dbeafe";
  };

  const getSalesForState = (stateName: string) => {
    const stateData = data.find(
      (d) => d.state.toLowerCase() === stateName.toLowerCase()
    );
    return stateData?.sales || 0;
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">Sales by State</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <ComposableMap projection="geoAlbersUsa">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const sales = getSalesForState(geo.properties.name);
                const stateName = geo.properties.name;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getColor(sales)}
                    stroke="#fff"
                    strokeWidth={0.5}
                    onMouseEnter={(evt: React.MouseEvent<SVGPathElement>) => {
                      const { clientX, clientY } = evt;
                      setTooltipContent({
                        state: stateName,
                        sales: sales,
                        x: clientX,
                        y: clientY,
                      });
                    }}
                    onMouseMove={(evt: React.MouseEvent<SVGPathElement>) => {
                      const { clientX, clientY } = evt;
                      if (tooltipContent) {
                        setTooltipContent({
                          ...tooltipContent,
                          x: clientX,
                          y: clientY,
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      setTooltipContent(null);
                    }}
                    style={{
                      default: { outline: "none" },
                      hover: {
                        fill: "#1e40af",
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {/* Tooltip */}
        {tooltipContent && (
          <div
            className="fixed z-50 pointer-events-none"
            style={{
              left: `${tooltipContent.x + 10}px`,
              top: `${tooltipContent.y + 10}px`,
            }}
          >
            <div className="bg-slate-900 text-white px-3 py-2 rounded-lg shadow-xl border border-slate-700">
              <p className="font-semibold text-sm">{tooltipContent.state}</p>
              <p className="text-xs text-slate-300 mt-1">
                Sales: <span className="font-bold text-white">{formatCurrency(tooltipContent.sales)}</span>
              </p>
              {tooltipContent.sales > 0 && (
                <p className="text-xs text-slate-400 mt-0.5">
                  {((tooltipContent.sales / maxSales) * 100).toFixed(1)}% of max
                </p>
              )}
            </div>
          </div>
        )}
        
        {/* Top 5 States */}
        <div className="mt-4 space-y-2">
          {data
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 5)
            .map((state, index) => (
              <div key={state.state} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground w-4">
                    {index + 1}.
                  </span>
                  <span className="text-sm font-medium">{state.state}</span>
                </div>
                <span className="text-sm font-bold text-primary">
                  {abbreviateNumber(state.sales)}
                </span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
