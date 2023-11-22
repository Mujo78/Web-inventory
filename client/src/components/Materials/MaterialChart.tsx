import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell, XAxis, YAxis, BarChart, Bar } from 'recharts';
import { SupplierWithMaterialAndQuantity } from '../../pages/materials/Materials';
import { useEffect, useState } from 'react';
import { ValueType, Payload } from 'recharts/types/component/DefaultTooltipContent';

interface Props {
  suppMatt: SupplierWithMaterialAndQuantity
}

interface PieChartData {
  name: string;
  value: number;
}

interface BarChartData {
  name: string;
  quantity: number;
}

const CustomTooltip = ({payload} : {payload: Payload<ValueType, string | number>[] | undefined}) => {
  if(payload && payload.length > 0) {
    return (
      <div className='bg-gray-50 p-4 rounded-lg opacity-90 border'>
        <p className='text-md'>Name: {payload[0].payload.name}</p>
      </div>
    )
  }

  return null;
}

const MaterialChart: React.FC<Props> = ({suppMatt}) => {

  const [chartData, setChartData] = useState<PieChartData[]>([]);
  const [barchartData] = useState<BarChartData[]>(suppMatt.materialsQuantity);

  useEffect(() => {
    const filteredData: PieChartData[] = suppMatt.supplierMaterialCounts
      .filter((n) => n.materialsCount >= 1)
      .slice(0, 5)
      .map((item) => ({
        name: item.supplier,
        value: item.materialsCount,
      }));

      setChartData(filteredData);
  }, [suppMatt]);


  const COLORS = ["#15607A", "#09BB9F", "#39F3BB", "#18A1CD", "#1D81A2"];

  return (
    <div className='flex flex-col justify-center h-full text-start w-full'>
      <div className='flex flex-col w-full gap-5 h-full'>
        <div className='border rounded-lg h-2/4 w-full p-4'>
          {
            chartData.length > 0 ?
            <>
              <h1 className='font-Rubik text-lg mb-3 font-bold'>
                Top suppliers by material count
              </h1>
              <div className='flex flex-col w-full items-center h-full justify-center'>
                <ResponsiveContainer width="100%" height='100%'>
                  <PieChart >
                    <Pie
                      animationEasing='ease-in'
                      animationBegin={0} animationDuration={400}
                      isAnimationActive={chartData.length > 0}
                      dataKey='value'
                      data={chartData}
                      cx='50%'
                      cy='40%'
                      outerRadius={80}
                      cursor={"pointer"}
                      label
                    >
                      {chartData.map((e, i) => (
                        <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend layout="vertical" verticalAlign="top" align="right" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </>
              :
            <div className='flex justify-center h-full w-full items-center'>
              <p>There is no data to display!</p>
            </div>
          }
        </div>
        <div className='border rounded-lg h-2/4 gap-3 p-4'>
          {
            barchartData.length > 0 ?
            <>
              <h1 className='font-Rubik text-lg font-bold'>
                Top materials by quantity
              </h1>
              <div className='flex flex-col items-center h-full justify-center'>
                <ResponsiveContainer width="100%" height="70%">
                      <BarChart
                            className='text-xs'
                            width={500}
                            height={200}
                            data={barchartData}
                            margin={{
                              top: 0,
                              right:80,
                              left: 0,
                              bottom: 5,
                            }}
                            layout='vertical'
                            >
                            <XAxis type='number' />
                            <YAxis dataKey="quantity" type='category'  />
                            <Tooltip content={({payload}) => <CustomTooltip payload={payload} />} />
                          
                            <Bar cursor={"pointer"}
                              dataKey="quantity" barSize={25}>
                                      {barchartData.map((e, i) => (
                                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                              ))}

                            </Bar>
                            </BarChart>
                </ResponsiveContainer>
              </div>
            </>
            : 
            <div className='flex justify-center h-full w-full items-center'>
              <p>There is no data to display!</p>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default MaterialChart;
