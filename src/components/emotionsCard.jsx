import React from "react";
import { useState } from "react";
import pic from "../assets/3.png"

function EmotionsCard(){
    const emotions = [{
        image: pic,
        name: 'Happy',
        description: "having a sense of confidence in or satisfaction with (a person, arrangement, or situation)."
    },{
        image: pic,
        name: 'Surprise',
        description: "having a sense of confidence in or satisfaction with (a person, arrangement, or situation)."
    },{
        image: pic,
        name: 'Sad',
        description: "having a sense of confidence in or satisfaction with (a person, arrangement, or situation)."
    },{
        image: pic,
        name: 'Bad',
        description: "having a sense of confidence in or satisfaction with (a person, arrangement, or situation)."
    },{
        image: pic,
        name: 'Angry',
        description: "having a sense of confidence in or satisfaction with (a person, arrangement, or situation)."
    },{
        image: pic,
        name: 'Fearful',
        description: "having a sense of confidence in or satisfaction with (a person, arrangement, or situation)."
    },{
        image: pic,
        name: 'Disgusted',
        description: "having a sense of confidence in or satisfaction with (a person, arrangement, or situation)."
    },
 ];


    return(
        <>
        <div className="flex gap-5 flex-wrap m-8 justify-center">
            {emotions.map((emotion, index) => (
                <div key={index} className="flex flex-col flex-none justify-centent-center rounded-md bg-white p-6 max-w-56 w-56">
                    <div className="flex justify-center pb-5">
                        <img src={emotion.image} className="rounded-full max-w-56 w-24"></img>
                    </div>
                    <h2 className="text-2xl font-medium text-neutral-800 uppercase" id="emotionName">{emotion.name}</h2>
                    <p id="emotionDescription" className="text-balance">{emotion.description}</p>
                </div>
            ))}
        </div>
        </>
    )
}
export default EmotionsCard