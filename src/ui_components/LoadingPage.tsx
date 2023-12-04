import { h } from "preact";
import loader from "../images/tidy-Loader-x2.gif";
import { VerticalSpace, Text, Muted } from "@create-figma-plugin/ui";
const LoaderPage = () => {
  return (
    <div className={"loader"}>
      <img src={loader} id={"loader-image"} />
      <VerticalSpace space="medium" />
      <Text>
        <Muted>Data is loading...</Muted>
      </Text>
    </div>
  );
};
export default LoaderPage;
