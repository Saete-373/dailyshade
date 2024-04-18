import Quote from "../components/quote";
import Recordbtn from "../components/button";
import EmotionsCard from "../components/emotionsCard";
import EmotionsCardPanel from "../components/EmotionsCardPanel";

function Home(){
    return(
        <>
            <div className="relative flex flex-col max-w-3xl">
                <div>
                     <Quote></Quote>                     
                </div>
                <div>
                     <Recordbtn></Recordbtn>                    
                </div>
            </div>
            <EmotionsCardPanel></EmotionsCardPanel>

        </>
    )
}

export default Home