import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

import { Alert } from 'flowbite-react';
import { SupplierWithMaterial } from '../pages/materials/Materials';

interface Props {
  suppMatt: SupplierWithMaterial[]
}



const MaterialChart: React.FC<Props> = ({suppMatt}) => {

  const chartData = suppMatt
  .filter((n) => n.materials >= 1)
  .slice(0, 5)
  .map((item) => ({
    name: item.supplier,
    value: item.materials,
  }));

  const COLORS = ["#15607A", "#09BB9F", "#39F3BB", "#18A1CD", "#1D81A2"];

  return (
    <div className='flex flex-col justify-center text-start w-full'>
      {chartData.length <= 0 ?
      <div className='flex mt-48 justify-center items-center'>
        <Alert color="info">
            <h1>There are no suppliers or materials available!</h1>
        </Alert>
      </div> : 
      <>
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
              label
            >
              {chartData.map((e, i) => (
                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout='vertical'  />
          </PieChart>
        </ResponsiveContainer>
      </div>
      </>
    }
    </div>
  );
};

export default MaterialChart;
