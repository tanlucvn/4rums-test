import React from 'react'
/* import Header from './Header' */
import Listing from './Listing'
import Activity from './Activity'
import './style.css'

export default function Body() {
    return (
        <div className='bottom flex'>
            <Listing />
            <Activity />
        </div>

    )
}
