import { Button, Label, Progress, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { makeProcess, process } from '../../features/processes/processSlice'
import { useAppDispatch } from '../../app/hooks'
import PPItems from '../../components/PPItems'

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
    <div className='w-full h-5/6 flex items-center justify-center mt-2'>
      <div className='px-3 h-3/4 border-gray-400 border-x border-y w-3/5 rounded-lg'>
        <div className='flex mt-5 '>
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
            <>
              <h1 className='text-24 font-Rubik text-4xl mt-12 pb-9 ml-5 font-bold'>
                Step {step} : Add new product process
              </h1>
                <form onSubmit={nextOne} className='flex flex-col justify-between h-5/6'>
                  <div>
                    <TextInput
                      autoComplete='off'
                      name='name'
                      id='name'
                      value={processName.name}
                      onChange={handleChange}
                      className='mx-5 mt-12'  />
                    <div className='flex flex-col'>
                      {status === "failed" && <Label htmlFor='name' className='text-sm mx-5 mt-1 font-normal !text-red-600'>{message}</Label>}
                      {errorMessage && status !== "failed" && <Label htmlFor='name' className='text-sm mx-5 mt-1 font-normal !text-red-600'>{errorMessage}</Label>}
                      <Label htmlFor='name' className='text-sm mx-5 mt-1 mb-24 font-normal !text-gray-400'>(Type in unique product process name)</Label>
                    </div>
                  </div>
                  <hr/>
                  <div className='flex justify-end'>
                    <Button type='submit' color="success" className='mb-1'>Next</Button>
                  </div>
              </form>
              </> :
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
