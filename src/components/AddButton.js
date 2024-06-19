import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Addbtn } from '../assets/add.svg'

const AddButton = () => {
    return (
        <Link to='/note/new' className='floating-button'>
            <Addbtn />
        </Link>
    )
}

export default AddButton
