import { h } from "preact";
import { FunctionComponent } from "preact";

const Footer: FunctionComponent = () => {
  return (
    <div className={"footer"}>
      <div className="leftFooterContent">
        <button onClick={() => console.log("to be delete")}>Reset</button>
      </div>
      <div className="rightFooterContent">
        <button onClick={() => console.log("to be cancel")}>Cancel</button>
        <button onClick={() => console.log("to be create")}>Create</button>
      </div>
    </div>
  );
};

export default Footer;
