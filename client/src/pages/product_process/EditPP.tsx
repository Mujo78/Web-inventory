import { Button } from 'flowbite-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const EditProductProcess = () => {
  
  const navigate = useNavigate()

  const handleSubmit = () =>{
    console.log("New submit")
  }
  
  const handleCancel = () =>{
    navigate("/processes")
  }
  
  return (
    <div>
        <h1 className='text-24 font-Rubik text-4xl mt-9 pb-7 ml-5 font-bold'>Edit product process</h1>
        <hr/>
      
          <div>
            <form onSubmit={handleSubmit}>
            
            
            <div>
              <Button onClick={handleCancel}  >Cancel</Button>
              <Button type='submit' >Save changes</Button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default EditProductProcess
