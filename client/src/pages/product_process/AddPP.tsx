import { Button, Label, Progress, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { makeProcess, process } from '../../features/process/processSlice'
import { useAppDispatch } from '../../app/hooks'
import PPItems from '../../components/ProductProcess/PPItems'
import { useNavigate } from 'react-router-dom'

export interface processNameIn {
  name: string
}

const AddProductProcess = () => {
  const [step, setStep] = useState<number>(1)
  const [processName, setProcessName] = useState<processNameIn>({
    name: ""
  })
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [processToModify, setProcessToModify] = useState<string>("")

  const navigate = useNavigate();
  const {message, status} = useSelector(process)
  const dispatch = useAppDispatch()

  const nextOne = (e : React.FormEvent) => {
    e.preventDefault()

    if(processName.name === ""){
      setErrorMessage("Process name is required!")
    }else{
        setErrorMessage("")
        dispatch(makeProcess(processName)).then(({payload}) => {
          if(typeof payload !== 'string'){
            setProcessToModify(payload._id)
            setStep((n) => n + 1)
          }
        })
    }
  }
    
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
      const {value, name} = e.currentTarget; 
      
      setProcessName((n) => ({
        ...n,
      [name] : value
    }))
  }
  
  return (
    <div className='w-full h-full flex items-center justify-center mt-12'>
      <div className='px-3 flex flex-col gap-16 h-3/4 border-gray-300 border w-3/5 rounded-lg'>
        <div className='flex h-1/4 mt-6'>
            <div className=' mr-1 w-3/6'>
            <Progress
              color="green"
              progress={100}
            />
          </div>
          <div className='ml-1 w-3/6'>
            <Progress
              color={step === 1 ? "gray" : "green"}
              progress={100}
            />
          </div>
        </div>
          <div className=' h-3/4'>
            { step === 1 ?
            <div className='flex flex-col gap-12'>
              <h1 className='text-24 font-Rubik text-4xl ml-5 font-bold'>
                Step {step} : Add new product process
              </h1>
                <form onSubmit={nextOne} className='flex flex-col justify-between gap-14 h-5/6'>
                  <div>
                    <Label htmlFor='name' className='text-sm mx-5 mt-12 font-normal !text-gray-400'>(Type in unique product process name)</Label>
                    <TextInput
                      autoComplete='off'
                      name='name'
                      id='name'
                      value={processName.name}
                      onChange={handleChange}
                      className='mx-5 mt-1'  />
                    <div className='flex h-4 flex-col'>
                      {status === "failed" && <Label htmlFor='name' className='text-sm mx-5 mt-1 font-normal !text-red-600'>{message}</Label>}
                      {errorMessage && status !== "failed" && <Label htmlFor='name' className='text-sm mx-5 mt-1 font-normal !text-red-600'>{errorMessage}</Label>}
                    </div>
                  </div>
                  <div className='mx-5'>
                    <hr/>
                    <div className='flex my-3 justify-between'>
                      <Button color='light' onClick={() => navigate(-1)}>Go Back</Button>
                      <Button type='submit' color="success" >Next</Button>
                    </div>
                  </div>
              </form>
              </div> :
              <>
                <PPItems id={processToModify} />
              </>
            }
          </div>
      </div>
    </div>
  )
}

export default AddProductProcess
