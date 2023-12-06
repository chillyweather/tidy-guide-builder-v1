import { h } from "preact";
import { FunctionComponent } from "preact";

const Footer: FunctionComponent = () => {
  return (
    <div className={"footer"}>
      <button onClick={() => console.log("to be cancel")}>Cancel</button>
      <button onClick={() => console.log("to be create")}>Create</button>
    </div>
  );
};

export default Footer;
