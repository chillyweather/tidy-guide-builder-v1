import { h } from "preact";
import { FunctionComponent } from "preact";
import { IconReload } from "@tabler/icons-react";

const Footer: FunctionComponent = () => {
  return (
    <div className={"footer"}>
      <div className="leftFooterContent">
        <button className={"flex-btn"} onClick={() => console.log("to be delete")}><IconReload />Reset</button>
      </div>
      <div className="rightFooterContent">
        <button className={"second"} onClick={() => console.log("to be cancel")}>Cancel</button>
        <button className={"primary"} onClick={() => console.log("to be create")}>Create</button>
      </div>
    </div>
  );
};

export default Footer;
