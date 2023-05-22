
import React from 'react'
import { Spinner, Button } from 'flowbite-react'

const Spiner: React.FC = () => {
  return (
    <div>
        <Button color="gray">
            <Spinner aria-label="Alternate spinner button example" />
                <span className="pl-3">
                Loading...
                </span>
        </Button>
    </div>
  )
}

export default Spiner
