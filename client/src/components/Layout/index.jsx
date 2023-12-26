import React from 'react'
import Sidebar from 'components/Layout/Sidebar'
import Header from './Header'
import { ToastContainer } from 'react-toastify';
/* import Rightbar from './Rightbar'; */
import SpeedDial from 'components/SpeedDial';

import './style.css'

export default function Layout({ children }) {
    return (
        <div className='container'>
            <Sidebar />

            <div className='mainContent'>
                <Header />
                <div>
                    {children}
                    {/* <Rightbar /> */}

                </div>
                <ToastContainer position="bottom-right" hideProgressBar={true} autoClose={2000} closeOnClick />
            </div>
            <SpeedDial />
        </div>
    )
}
