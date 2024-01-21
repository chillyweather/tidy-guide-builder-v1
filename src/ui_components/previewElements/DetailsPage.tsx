import ElementSection from "./ElementSection";
import { h } from "preact";
const DetailsPage = (data: any) => {
  const section = data.data;
  const sectionData = section.docs;
  const status = section.inProgress;
  return (
    <div className="viewer-data-wrapper">
      <div className={"section headerSection"}>
        <div className="title-wrapper">
          <strong>
            <h1 id={"sectionHeader"}>{section.title}</h1>
          </strong>
          {status && <div className={"wip"}>WIP</div>}
        </div>
      </div>
      {sectionData.map((element: any, index: number) => {
        console.log("element.hidden", element.hidden);
        if (
          element.publish &&
          element.datatype !== "release-notes" &&
          element.hidden !== true
        ) {
          return ElementSection({
            element,
            index,
          });
        }
      })}
    </div>
  );
};

export default DetailsPage;
