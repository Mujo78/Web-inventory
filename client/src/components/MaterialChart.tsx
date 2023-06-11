import React, { useEffect, useState } from 'react'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js"
import {Doughnut} from "react-chartjs-2"
import axios from 'axios';

export interface SupplierWithMaterial {
  supplier: string,
  materials: number
}

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins:{
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
      rtl:true,
      labels:{
        usePointStyle: true, 
        padding: 20
      }
    }
  }
} as any;

const MaterialChart: React.FC = () => {
  
  const [suppMatt, setSuppMatt] = useState<SupplierWithMaterial[]>([])
  
  useEffect(() => {
    axios.get("/supplier-materials")
    .then(res => setSuppMatt(res.data))
    .catch((err) => console.log(err) )
  }, [])

  const materialsandsuppliers = suppMatt?.filter(n => n.materials >= 1).slice(0, 5)
 
  const data = {
    datasets: [
      {
        label: 'Number of materials:',
        data: materialsandsuppliers.map(n => n.materials),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
    labels: materialsandsuppliers.map(n => n.supplier),
  }



  return (
    <div className='flex flex-col justify-center text-start w-full'>
      <h1 className='font-Rubik text-xl mt-2 mb-5 font-bold'>Top suppliers by material count</h1>
      <div className='flex flex-col items-center justify-center'>
        <Doughnut
          data={data} className='!w-[320px] !h-[320px]' options={options}
        />
      </div>
    </div>
  )
}

export default MaterialChart
