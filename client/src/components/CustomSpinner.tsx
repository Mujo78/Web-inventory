import { Spinner } from 'flowbite-react'
import React from 'react'

type Props = {
  size?: string
}

const CustomSpinner: React.FC<Props> = ({size}) => {
  return (
    <div className='flex items-center justify-center mt-12'>
        <Spinner size={size} />
    </div>
  )
}

export default CustomSpinner
