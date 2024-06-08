import { ForgottenPassword } from "../components/ForgottenPassword";
import "./styles/bg.css";

function FogetPW() {
  return (
    <div
      className="flex justify-center max-x-screen  max-h-full h-screen place-items-center"
      id="css-selector-fgw"
    >
      <div className="flex w-5/12 max-h-screen h-3/5 border-2 border-white rounded-xl gap-5 bg-white/10 backdrop-blur-md">
        <div className="md:w-full">
          <ForgottenPassword />
        </div>
      </div>
    </div>
  );
}

export default FogetPW;
