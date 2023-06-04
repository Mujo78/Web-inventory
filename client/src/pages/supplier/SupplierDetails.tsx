import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { useSelector } from 'react-redux'
import { Supplier, supplier } from '../../features/supplier/suppSlice'

const SupplierDetails: React.FC = () => {

    let {id} = useParams()
    
    const {suppliers, status, message} = useSelector(supplier)
    const supp: Supplier | undefined =  suppliers.find(n => n._id === id)
    
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    
    const goBack = () => {
        navigate("/suppliers")
    }

    return (
        <div>
            <h1>Supplier details goes here!</h1>
        </div>
    )
}

export default SupplierDetails
