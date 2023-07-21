import React from 'react'
import CustomToast from './CustomToast'

interface Props {
    title: string,
    other?: string,
    status?: string,
    message?: string
}

const Header: React.FC<Props> = ({title, other, status, message}) => {
  return (
    <>
      <div className='flex justify-between items-center'>
            <h1 className='font-Rubik text-4xl mt-7 pb-5 ml-5 font-bold'>
                {title}
            </h1>
            {other && <h1 className='font-Rubik text-2xl mt-9 pb-5 mr-5 font-bold'>
                {'#' + other}
            </h1>}
            {(status === 'idle' ||  status === 'failed') && message && (
                <CustomToast status={status} message={message} />
            )}
        </div>
        <hr/>
    </>
  )
}

export default Header
