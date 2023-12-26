import React from 'react'
import './style.css'

// import icons
import { ArrowRight } from "@phosphor-icons/react";

export default function Activity() {
    return (
        <div className='activitySection'>
            <div className="heading flex">
                <h1>Recent Activity</h1>
                <button className='btn flex'>
                    See All <ArrowRight className='icon' />
                </button>
            </div>

            <div className="secContainer grid">
                <div className="singleCustomer flex">
                    <img src="https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=Misty" alt="Avatar" />
                    <div className="customerDetails">
                        <span className='name'>Ola Martha</span>
                        <small>New board posted</small>
                    </div>
                    <div className="duration">
                        2 mins ago
                    </div>
                </div>

                <div className="singleCustomer flex">
                    <img src="https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=Abby" alt="Avatar" />
                    <div className="customerDetails">
                        <span className='name'>Ola Martha</span>
                        <small>New board posted</small>
                    </div>
                    <div className="duration">
                        2 mins ago
                    </div>
                </div>

                <div className="singleCustomer flex">
                    <img src="https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=Sophie" alt="Avatar" />
                    <div className="customerDetails">
                        <span className='name'>Ola Martha</span>
                        <small>New board posted</small>
                    </div>
                    <div className="duration">
                        2 mins ago
                    </div>
                </div>

                <div className="singleCustomer flex">
                    <img src="https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=Mia" alt="Avatar" />
                    <div className="customerDetails">
                        <span className='name'>Ola Martha</span>
                        <small>New board posted</small>
                    </div>
                    <div className="duration">
                        2 mins ago
                    </div>
                </div>
            </div>
        </div>
    )
}
