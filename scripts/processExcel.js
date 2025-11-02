const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Function to convert Excel serial date to JavaScript Date
function excelDateToJSDate(serial) {
  if (typeof serial !== 'number') return serial;
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);
  return date_info.toISOString().split('T')[0]; // Return YYYY-MM-DD format
}

// Read the Excel file
const workbook = XLSX.readFile(path.join(__dirname, '../data/base de datos - Superstore - p1.xlsx'));
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON with date parsing
const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false, dateNF: 'yyyy-mm-dd' });

// Process dates and numeric values to ensure they're in correct format
const processedData = jsonData.map(row => {
  const newRow = { ...row };
  
  // Convert Order Date if it's a number (Excel serial date)
  if (newRow['Order Date'] && typeof newRow['Order Date'] === 'number') {
    newRow['Order Date'] = excelDateToJSDate(newRow['Order Date']);
  }
  
  // Convert Ship Date if it's a number (Excel serial date)
  if (newRow['Ship Date'] && typeof newRow['Ship Date'] === 'number') {
    newRow['Ship Date'] = excelDateToJSDate(newRow['Ship Date']);
  }
  
  // Convert numeric fields from strings to numbers
  const numericFields = ['Sales', 'Quantity', 'Discount', 'Profit'];
  numericFields.forEach(field => {
    if (newRow[field] !== undefined && newRow[field] !== null) {
      const value = parseFloat(newRow[field]);
      if (!isNaN(value)) {
        newRow[field] = value;
      }
    }
  });
  
  return newRow;
});

// Save to public folder
const outputPath = path.join(__dirname, '../public/data.json');
fs.writeFileSync(outputPath, JSON.stringify(processedData, null, 2));

console.log(`✅ Processed ${processedData.length} rows`);
console.log(`✅ Data saved to ${outputPath}`);
