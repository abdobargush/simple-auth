"use client";

import { useEffect } from "react";
import useStore from "@/store";
import { Grid2, Paper, Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import AppHeader from "@/components/AppHeader";
import ProductCategoryChart from "@/components/ProductCategoryChart";
import ProductPriceWeightChart from "@/components/ProductPriceWeightChart";
import UserBirthHeightChart from "@/components/UserBirthHeightChart";
import UserBirthYearChart from "@/components/UserBirthYearChart";

const StatisticsPage = () => {
  const { users, products, fetchUsers, fetchProducts } = useStore();

  useEffect(() => {
    fetchUsers({ limit: 200 });
    fetchProducts({ limit: 200 });
  }, [fetchUsers, fetchProducts]);

  return (
    <>
      <AppHeader title="Statistics" />
      <Grid2 container spacing={4}>
        <Grid2 size={6}>
          <Paper>
            <Box px={4} py={2} borderBottom="1px solid" borderColor={grey[300]}>
              <Typography variant="h6">
                Users birth year distribution
              </Typography>
            </Box>
            <Box p={1} height="24rem">
              <UserBirthYearChart users={users.users} />
            </Box>
          </Paper>
        </Grid2>
        <Grid2 size={6}>
          <Paper>
            <Box px={4} py={2} borderBottom="1px solid" borderColor={grey[300]}>
              <Typography variant="h6">
                Height change over birth years
              </Typography>
            </Box>
            <Box p={1} height="24rem">
              <UserBirthHeightChart users={users.users} />
            </Box>
          </Paper>
        </Grid2>
        <Grid2 size={6}>
          <Paper>
            <Box px={4} py={2} borderBottom="1px solid" borderColor={grey[300]}>
              <Typography variant="h6">
                Users birth year distribution
              </Typography>
            </Box>
            <Box p={1} height="24rem">
              <ProductPriceWeightChart products={products.products} />
            </Box>
          </Paper>
        </Grid2>
        <Grid2 size={6}>
          <Paper>
            <Box px={4} py={2} borderBottom="1px solid" borderColor={grey[300]}>
              <Typography variant="h6">
                Product weight to price distribution
              </Typography>
            </Box>
            <Box p={1} height="24rem">
              <ProductCategoryChart products={products.products} />
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default StatisticsPage;
