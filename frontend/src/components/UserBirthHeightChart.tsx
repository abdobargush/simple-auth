import { User } from "@/types";
import { orange } from "@mui/material/colors";
import { LineChart } from "@mui/x-charts";

const calculateAvgHeightByYear = (data: Array<User>) => {
  const yearMap: { [key: number]: { totalHeight: number; count: number } } = {};

  data.forEach((user: User) => {
    const year = new Date(user.birthDate).getFullYear();

    if (!yearMap[year]) {
      yearMap[year] = { totalHeight: 0, count: 0 };
    }

    yearMap[year].totalHeight += user.height;
    yearMap[year].count += 1;
  });

  // Return an array with the year and the average height for that year
  return Object.keys(yearMap).map((year) => ({
    year: new Date(parseInt(year, 10), 0),
    avgHeight:
      yearMap[parseInt(year, 10)].totalHeight /
      yearMap[parseInt(year, 10)].count,
  }));
};

const UserBirthHeightChart = ({ users }: { users: Array<User> }) => {
  const chartData = calculateAvgHeightByYear(users);

  return (
    <LineChart
      colors={[orange[700]]}
      dataset={chartData}
      series={[{ dataKey: "avgHeight", label: "Average Height (cm)" }]}
      yAxis={[{ dataKey: "avgHeight", label: "Average Height (cm)" }]}
      xAxis={[{ scaleType: "time", dataKey: "year", label: "Birth Year" }]}
    />
  );
};

export default UserBirthHeightChart;
