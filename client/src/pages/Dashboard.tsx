import React from 'react'
import useSelectedPage from '../hooks/useSelectedPage'
import  {AiOutlinePlus} from "react-icons/ai"
import CustomButton from '../components/UI/CustomButton'

const Dashboard: React.FC = () => {

  useSelectedPage("Dashboard")

  function onclck(){
    console.log("object")
  }
  
  return (
    <div>
      <h1>All thing will go here</h1>
      <CustomButton v={1} onClick={onclck} className='bg-white w-[80px] h-[80px] focus:ring-gray-50 shadow-xl hover:bg-white hover:focus:ring-gray-100 flex justify-center items-center hover:transition-all hover:duration-300 !rounded-full'>
        <AiOutlinePlus style={{color: "green", width: 30, height: 30, fontWeight: 'bold'}} />
      </CustomButton>
    </div>
  )
}

export default Dashboard
