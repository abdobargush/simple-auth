import { User } from "@/types";
import { BarChart } from "@mui/x-charts";

const getBirthsByYear = (data: Array<User>) => {
  const birthYears: { [key: number]: number } = {};

  data.forEach((person) => {
    const year = new Date(person.birthDate).getFullYear();
    birthYears[year] = (birthYears[year] || 0) + 1;
  });

  return birthYears;
};

const UserBirthYearChart = ({ users }: { users: Array<User> }) => {
  const birthYears = getBirthsByYear(users);
  const chartData = Object.keys(birthYears).map((key) => ({
    year: key,
    birthCount: birthYears[key as unknown as keyof typeof birthYears],
  }));

  return (
    <BarChart
      dataset={chartData}
      series={[{ dataKey: "birthCount" }]}
      yAxis={[{ dataKey: "birthCount", label: "Birth Count" }]}
      xAxis={[{ scaleType: "band", dataKey: "year", label: "Year" }]}
    />
  );
};

export default UserBirthYearChart;
