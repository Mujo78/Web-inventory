import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

import axios from 'axios';

export interface SupplierWithMaterial {
  supplier: string,
  materials: number
}




const MaterialChart: React.FC = () => {
  const [suppMatt, setSuppMatt] = useState<SupplierWithMaterial[]>([]);

  useEffect(() => {
    axios
      .get("/supplier-materials")
      .then((res) => setSuppMatt(res.data))
      .catch((err) => console.log(err));
  }, []);

  const materialsandsuppliers = suppMatt
    .filter((n) => n.materials >= 1)
    .slice(0, 5);

  const chartData = materialsandsuppliers.map((item) => ({
    name: item.supplier,
    value: item.materials,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className='flex flex-col justify-center text-start w-full'>
      <h1 className='font-Rubik text-xl mt-2 mb-5 font-bold'>
        Top suppliers by material count
      </h1>
      <div className='flex flex-col items-center justify-center'>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              dataKey='value'
              isAnimationActive={true}
              data={chartData}
              cx='50%'
              cy='50%'
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MaterialChart;
