import { h } from "preact";
import { useState } from "preact/hooks";
import { Link } from "./Link";
import { Header } from "./Header";
import { Video } from "./Video";
import { Image } from "./Image";
import { List } from "./List";
import { TwoColumns } from "./TwoColumns";
import { Text } from "./Text";

const ElementSection = ({
  element,
  index,
}: {
  element: any;
  index: number;
}) => {
  const renderList = (arr: any) => {
    return (
      <ul className="list">
        {arr.map(
          (line: any, i: number) =>
            !!line.length && (
              <li key={i} className="list-item">
                {line}
              </li>
            )
        )}
      </ul>
    );
  };

  switch (element.datatype) {
    case "link":
      return <Link element={element} index={index} />;
    case "text":
      return <Text element={element} index={index} />;
    case "two-columns":
      return (
        <TwoColumns element={element} buildLists={renderList} index={index} />
      );
    case "list":
      return <List element={element} buildLists={renderList} index={index} />;
    case "image":
      return <Image element={element} index={index} />;
    case "video":
      return <Video element={element} index={index} />;
    default:
      return null;
  }
};

export default ElementSection;
