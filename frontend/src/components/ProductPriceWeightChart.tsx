import { Product } from "@/types";
import { red } from "@mui/material/colors";
import { ScatterChart } from "@mui/x-charts";

const ProductPriceWeightChart = ({
  products,
}: {
  products: Array<Product>;
}) => {
  return (
    <ScatterChart
      colors={[red[600]]}
      series={[
        {
          data: products.map((product) => ({
            id: product.id,
            x: product.weight,
            y: product.price,
          })),
        },
      ]}
      yAxis={[
        {
          label: "Product Price",
          min: 0,
          max: 100,
        },
      ]}
      xAxis={[{ label: "Product Weight" }]}
    />
  );
};

export default ProductPriceWeightChart;
