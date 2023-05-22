import React from 'react'
import { Label,Button } from 'flowbite-react'

type Props = {
    forgotPass : boolean, 
    setForgotPass: React.Dispatch<React.SetStateAction<boolean>>
}

const InfoLogin : React.FC<Props> = ({forgotPass, setForgotPass}) => {
    const forgotPassword = () =>{
        setForgotPass(n => !n)
    }
  return (
            <div className='w-full px-10 mx-5 flex flex-col justify-center'>
                <h1 className=' font-Rubik text-gray-300 text-4xl font-bold pb-7 text-center '>Login to Manage Your Inventory</h1>
                <p className='text-gray-300 mb-10'>It to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                <Button color="light" onClick={forgotPassword}>Forgot password</Button>
             </div>
  )
}

export default InfoLogin
