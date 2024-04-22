import React from "react";
import png from '../assets/3.png'

function Footer(){
    return(
        <>
            <div className=" bg-base-pink">
                <div className="p-20 flex flex-wrap flex-row gap-x-96 gap-y-10 justify-center">
                    <div>
                        <img src={png} className="max-w-40"></img>
                        <h2>DailyShade</h2>
                        <p>Description</p>
                    </div>
                    <div>
                        <div>
                            <h3>Contact us</h3>
                            <ul>
                                <li>mail</li>
                                <li>mail</li>
                            </ul>
                        </div>
                        <div>
                            <h3>Follow us</h3>
                            <ul>
                                <li>mail</li>
                            </ul>
                        </div>
                    </div>  
                    <div>
                        <h3>menu</h3>
                        <ul>
                            <li>home</li>
                            <li>calendar</li>
                            <li>emotions</li>
                            <li>ins</li>
                        </ul>
                    </div>                  
                </div>
            </div>
        </>
    )
}

export default Footer