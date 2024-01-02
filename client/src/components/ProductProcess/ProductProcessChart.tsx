import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getProcessesInfo, process } from "../../features/process/processSlice";
import { Card } from "flowbite-react";
import {
  PieChart,
  Cell,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAppDispatch } from "../../app/hooks";

interface ProcessType {
  name: string;
  value: number;
}
const COLORS = ["#dc2626", "#9ca3af", "#16a34a"];

const ProductProcessChart: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProcessesInfo());
  }, [dispatch]);

  const { processInfo } = useSelector(process);

  const dataChart: ProcessType[] = [
    {
      name: "Finished",
      value: processInfo.finished,
    },
    {
      name: "New processes",
      value: processInfo.newOnes,
    },
    {
      name: "Active",
      value: processInfo.activeOnes,
    },
  ];

  return (
    <Card className="h-2/4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            className="cursor-pointer"
            dataKey="value"
            isAnimationActive={false}
            data={dataChart}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#82ca9d"
            label
          >
            {dataChart.map((e, i) => (
              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="top" />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ProductProcessChart;
