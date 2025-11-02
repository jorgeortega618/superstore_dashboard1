# Superstore Sales Dashboard

A modern, interactive analytics dashboard built with Next.js 14, TypeScript, and TailwindCSS. Deployed on Vercel.

## Features

✨ **Modern UI/UX**
- Clean, responsive design inspired by modern analytics platforms
- Gradient backgrounds and smooth animations
- Mobile-first approach

📊 **Interactive Visualizations**
- KPI cards with trend indicators and sparklines
- Interactive US map showing sales by state
- Category and segment performance charts
- Top 10 sub-categories with progress bars
- Real-time filtering capabilities

🔍 **Advanced Filtering**
- Filter by year, month, and customer segment
- Year-over-year comparison
- Dynamic data updates

💡 **Automated Insights**
- AI-generated business insights
- Performance alerts and recommendations
- Trend analysis

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Charts**: Recharts
- **Maps**: react-simple-maps
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Process the Excel data to JSON:
```bash
npm run process-data
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
superstore_dashboard/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── ui/
│   │   └── card.tsx         # Card component
│   ├── KPICard.tsx          # KPI metric cards
│   ├── USMap.tsx            # US map visualization
│   ├── CategoryChart.tsx    # Category bar chart
│   ├── SegmentChart.tsx     # Segment comparison chart
│   ├── SubCategoryChart.tsx # Sub-category rankings
│   ├── Filters.tsx          # Filter controls
│   └── InsightsPanel.tsx    # Insights display
├── lib/
│   └── utils.ts             # Utility functions
├── scripts/
│   └── processExcel.js      # Excel to JSON converter
├── data/
│   └── base de datos - Superstore - p1.xlsx
└── public/
    └── data.json            # Processed data (generated)
```

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy

### Important: Process Data Before Deployment

Make sure to run `npm run process-data` before deploying to generate the `public/data.json` file.

## Data Processing

The dashboard uses data from `data/base de datos - Superstore - p1.xlsx`. The script `scripts/processExcel.js` converts this to JSON format for the web application.

Expected Excel columns:
- Order Date
- Ship Date
- Sales
- Profit
- Quantity
- Category
- Sub-Category
- Segment
- State
- Order ID

## Customization

### Changing Colors

Edit `tailwind.config.ts` to modify the color scheme:

```typescript
colors: {
  primary: "hsl(221.2 83.2% 53.3%)", // Change this
  // ... other colors
}
```

### Adding New Metrics

1. Add calculation in `app/page.tsx` in the `useMemo` hooks
2. Create a new component in `components/`
3. Import and use in the dashboard grid

## Performance Optimization

- Data is loaded once and cached
- All calculations use React `useMemo` for optimization
- Charts are lazy-loaded
- Images and assets are optimized by Next.js

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

Built with ❤️ for modern data analytics
