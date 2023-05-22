import { useState} from 'react'

import LoginForm from '../components/LoginForm'
import InfoLogin from '../components/InfoLogin'
import ForgetPasswordForm from '../components/ForgetPasswordForm'
import InfoForgot from '../components/InfoForgot'

type User = {
    username: string,
    password: string
}

type Props = {
    forgotPass : boolean, 
    setForgotPass: React.Dispatch<React.SetStateAction<boolean>>
}

export const classNm = 'w-full border-x-0 border-t-0 focus:ring-0 focus:border-green-500'
export const animationLeftClass = "transition-transform duration-300 ease-out transform translate-x-0 sm:translate-x-full"

const LandingPage : React.FC = () => {

  const [forgotPass, setForgotPass] = useState<boolean>(false)
    console.log(forgotPass)
  return (
    <div className='text-start w-full h-screen flex items-center'>
        <div className={`w-3/4 flex justify-center flex-col ${forgotPass ? 'animate-slide-right' : 'animate-slide-back-right'}`}> 
        {forgotPass ?
           <div className={`w-2/4 mx-auto `}>
               <ForgetPasswordForm />
               </div> : 
              <div className={`w-2/4 mx-auto`}>
               <LoginForm />
           </div>
        }
  </div>
  <div className={`bg-green-400 w-1/4 h-screen flex-col flex items-center justify-center ${forgotPass ? 'animate-slide-left' : ' animate-slide-back-left'}`}>
    <div className='w-full px-10 mx-5 flex flex-col justify-center'>
      {forgotPass ?
            <InfoForgot forgotPass={forgotPass} setForgotPass={setForgotPass}/>
          : <InfoLogin forgotPass={forgotPass} setForgotPass={setForgotPass} />   
    }
    </div>
  </div>
    </div>
  )
}

export default LandingPage
