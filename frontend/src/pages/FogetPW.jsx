import { ForgottenPassword } from "../components/ForgottenPassword";
import "./styles/bg.css";

function FogetPW() {
  return (
    <div
      className="flex justify-center max-x-screen  max-h-full h-screen place-items-center"
      // id="css-selector-fgw"
    >
      <div className="flex w-5/12  ipad:w-10/12  max-h-screen  rounded-xl gap-5 bg-snow card-shadow">
        <div className="w-full">
          <ForgottenPassword />
        </div>
      </div>
    </div>
  );
}

export default FogetPW;
