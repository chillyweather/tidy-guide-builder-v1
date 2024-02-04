import { h } from "preact";
import { emit } from "@create-figma-plugin/utilities";
import { useState } from "preact/hooks";
import { TidyLogo } from "../images/TidyLogo";
import { IconMail, IconEye } from "@tabler/icons-react";
import { login } from "./ui_functions/authentication";

const Settings = ({}: {}) => {
  return (
    <div className={"componentBTN-wrapper"}>
      <button>Delete account</button>
    </div>
  );
};

export default Settings;
