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
          <div className="flex-link">
          {status && <div className={"wip"}>WIP</div>}
          <a href={"https://tidy.guide/guide/" + section._id} className={"web-link"} target={"_blank"}>View on Website</a>
          </div>
        </div>
      </div>
      {sectionData.map((element: any, index: number) => {
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
