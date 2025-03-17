import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TablePaginationProps,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

const AppTable = ({
  headers,
  PaginationProps,
  isLoading = false,
  children,
}: {
  headers: Array<string>;
  PaginationProps?: TablePaginationProps;
  isLoading?: boolean;
  children: React.ReactNode;
}) => {
  return isLoading ? (
    <Box py="4rem" textAlign="center">
      <CircularProgress />
      <Typography variant="body2">Loading data...</Typography>
    </Box>
  ) : (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {headers.map((header, idx) => (
                <TableCell key={idx}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
      {PaginationProps && (
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          {...PaginationProps}
        />
      )}
    </>
  );
};

export default AppTable;
