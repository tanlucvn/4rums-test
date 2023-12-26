import React from 'react'
import './style.css'

// import icons
import { ArrowRight, Heart } from "@phosphor-icons/react";

import img from 'assets/1.png'

export default function Listing() {
    return (
        <div className='listingSection'>
            <div className="heading flex">
                <h1>My Listings</h1>
                <button className='btn flex'>
                    See All <ArrowRight className='icon' />
                </button>
            </div>

            <div className="secContainer flex">
                <div className="singleItem">
                    <Heart className='icon' />
                    <img src={img} alt="" />
                    <h3>Item title 1</h3>
                </div>

                <div className="singleItem">
                    <Heart weight='fill' className='icon' />
                    <img src={img} alt="" />
                    <h3>Item title 2</h3>
                </div>

                <div className="singleItem">
                    <Heart className='icon' />
                    <img src={img} alt="" />
                    <h3>Item title 3</h3>
                </div>

                <div className="singleItem">
                    <Heart weight='fill' className='icon' />
                    <img src={img} alt="" />
                    <h3>Item title 4</h3>
                </div>
            </div>

            <div className="sellers flex">
                <div className="topSellers">
                    <div className="heading flex">
                        <h3>Top Activity</h3>
                        <button className='btn flex'>
                            See All <BsArrowRightShort className='icon' />
                        </button>
                    </div>

                    <div className="card flex">
                        <div className="users">
                            <img src="https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=Zoey" alt="Avatar" />
                            <img src="https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=Trouble" alt="Avatar" />
                            <img src="https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=Boots" alt="Avatar" />
                            <img src="https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=Lilly" alt="Avatar" />
                        </div>

                        <div className="cardText">
                            <span>
                                14.245 Points <br />
                                <small>
                                    21 User <span className="date">7 Days</span>
                                </small>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="featuredSellers">
                    <div className="heading flex">
                        <h3>Top Uploads</h3>
                        <button className='btn flex'>
                            See All <BsArrowRightShort className='icon' />
                        </button>
                    </div>

                    <div className="card flex">
                        <div className="users">
                            <img src="https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=Zoey" alt="Avatar" />
                            <img src="https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=Trouble" alt="Avatar" />
                            <img src="https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=Boots" alt="Avatar" />
                            <img src="https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=Lilly" alt="Avatar" />
                        </div>

                        <div className="cardText">
                            <span>
                                1.456 Boards <br />
                                <small>
                                    102 User <span className="date">31 Days</span>
                                </small>
                            </span>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
