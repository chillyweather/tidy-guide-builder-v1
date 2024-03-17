/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";

export const Text = ({ element, index }: any) => (
  <div className={"section textSection"}>
    <div className={"anchorLink"} id={element.title + index}></div>
    {element.title && (
      <div className={"title-row"}>
        <h3 className={"title"}>{element.title}</h3>
        <a href={"#top"} className={"back-link"}>
          ⬆︎
        </a>
      </div>
    )}
    {console.log("element", element)}
    {element.text && element.text.length && <p>{element.text}</p>}
  </div>
);
