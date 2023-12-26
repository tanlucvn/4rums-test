import React from 'react'

import './style.css'

import { ArrowRight, Question } from "@phosphor-icons/react";

import video from "assets/video.mp4"
import img from "assets/1.png"

export default function CardStats() {
    return (
        <div className="cardSection flex">
            <div className="rightCard flex">
                <h1>Join on The Events In the Community</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Natus nulla quaerat libero vel laborum fugiat, dolorum et. Fugit velit, amet
                    laboriosam, ad sed cumque itaque architecto quis quisquam expedita fugiat?</p>

                <div className='buttons flex'>
                    <button className='btn'>Get Started</button>
                    <button className='btn transparent'>See more</button>
                </div>

                <div className="videoDiv">
                    <video src={video} autoPlay loop></video>
                </div>
            </div>

            <div className="leftCard flex">
                <div className="main flex">
                    <div className="textDiv">
                        <h1>My Stats</h1>

                        <div className='flex'>
                            <span>
                                Today <br /> <small>4 Boards</small>
                            </span>
                            <span>
                                This Month <br /> <small>127 Boards</small>
                            </span>
                        </div>

                        <div className='flex link'>
                            Activity history <ArrowRight className='icon' />
                        </div>
                    </div>

                    <div className="imgDiv">
                        <img src={img} alt="" />
                    </div>
                </div>

                <div className="sideBarCard">
                    <Question className='icon' />
                    <div className="cardContent">
                        <div className="circle1"></div>
                        <div className="circle2"></div>

                        <h3>Help Center</h3>
                        <p>Having trouble in 4rums, please contact us from for more questions.</p>
                        <button className='btn'>Go to help center</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
