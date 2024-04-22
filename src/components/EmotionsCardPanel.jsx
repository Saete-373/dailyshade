import React from "react";
import EmotionsCard from "./emotionsCard";
function EmotionsCardPanel(){
    return(
        <>
            <div className="flex justify-center ">
                <div className="max-w-screen-xl w-4/5 bg-black p-5 rounded-md ">
                        <EmotionsCard></EmotionsCard>
                </div>
            </div>
        </>
    )
}
export default EmotionsCardPanel