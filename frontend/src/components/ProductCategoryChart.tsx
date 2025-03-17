import { Product } from "@/types";
import { PieChart } from "@mui/x-charts";

const getProductsCountByCategory = (data: Array<Product>) => {
  const categories: { [key: string]: number } = {};

  data.forEach((product) => {
    const category = product.category;
    categories[category] = (categories[category] || 0) + 1;
  });

  return categories;
};

const ProductCategoryChart = ({ products }: { products: Array<Product> }) => {
  const categoriesCount = getProductsCountByCategory(products);
  const chartData = Object.keys(categoriesCount).map((key) => ({
    label: key,
    value: categoriesCount[key],
  }));

  return (
    <PieChart
      series={[
        {
          data: chartData,
          sortingValues: "desc",
        },
      ]}
      slotProps={{
        legend: {
          hidden: true,
        },
      }}
    />
  );
};

export default ProductCategoryChart;
