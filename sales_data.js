const fs = require("fs");

const salesData = [];
let currentLine = "";
const data = fs.readFileSync("sales_data.txt", "utf8");
const lines = data.split("\n");

for (let i = 0; i < lines.length; i++) {
  currentLine = lines[i];
  if (currentLine !== "") salesData.push(currentLine.split(","));
}

// Total Sales

let totalSales = 0;
for (let i = 1; i < salesData.length; i++) {
  totalSales += parseFloat(salesData[i][4]);
}
console.log(`Total sales of the store: ${totalSales}`);

// Month-wise sales totals.

const monthSales = {};
for (let i = 1; i < salesData.length; i++) {
  const date = salesData[i][0].split('-');
  const month = date[1];

  if (!monthSales[month]) monthSales[month] = 0;

  monthSales[month] += parseFloat(salesData[i][4]);
}
console.log("Month-wise sales totals:", monthSales);

// Most popular item (most quantity sold) in each month.

const popularItem = {};
for (let i = 1; i < salesData.length; i++) {
  const date = salesData[i][0].split('-');
  const month = date[1];
  const quantity = parseInt(salesData[i][3], 10);

  if (!popularItem[month]) {
    popularItem[month] = { SKU: salesData[i][1], quantity: quantity };
  } else {
    if (popularItem[month].quantity < quantity) {
      popularItem[month] = { SKU: salesData[i][1], quantity: quantity };
    }
  }
}

console.log("Most popular items in each month:", JSON.stringify(popularItem, null, 2));

// Items generating most revenue in each month.

const monthRevenueItem = {};
for (let i = 1; i < salesData.length; i++) {
  const date = salesData[i][0].split('-');
  const month = date[1];
  const revenue = parseFloat(salesData[i][4]);

  if (!monthRevenueItem[month]) {
    monthRevenueItem[month] = { SKU: salesData[i][1], revenue: revenue };
  } else {
    if (monthRevenueItem[month].revenue < revenue) {
      monthRevenueItem[month] = { SKU: salesData[i][1], revenue: revenue };
    }
  }
}

console.log("Items generating most revenue in each month:", JSON.stringify(monthRevenueItem, null, 2));


// Most popular item  (min, max, average orders) in each month
const mostPopularItemStats = {};
for (let i = 1; i < salesData.length; i++) {
  const date = salesData[i][0].split('-');
  const month = date[1];
  const sku = salesData[i][1];
  const quantity = parseInt(salesData[i][3], 10);

  if (!mostPopularItemStats[month]) {
    mostPopularItemStats[month] = { SKU: sku, min: quantity, max: quantity, sum: quantity, count: 1 };
  } else if (mostPopularItemStats[month].SKU === sku) {
    mostPopularItemStats[month].sum += quantity;
    mostPopularItemStats[month].count += 1;
    mostPopularItemStats[month].min = Math.min(mostPopularItemStats[month].min, quantity);
    mostPopularItemStats[month].max = Math.max(mostPopularItemStats[month].max, quantity);
  }
}
for (const month in mostPopularItemStats) {
    const stats = mostPopularItemStats[month];
    stats.avg = stats.sum / stats.count;
  }
  
console.log("Most popular item statistics in each month:", JSON.stringify(mostPopularItemStats, null, 2));


