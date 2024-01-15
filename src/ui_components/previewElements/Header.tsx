import { h } from "preact";

export const Header = ({ element, navigationLinks }: any) => {
  const status = element.inProgress;
  return (
    <div className={"section headerSection"}>
      <div className="title-wrapper">
        <strong>
          <h1 id={"sectionHeader"}>{element.title}</h1>
        </strong>
        {status && <div className={"wip"}>WIP</div>}
      </div>
      <div className={"nav-wrapper"}>
        <div className={"nav-container"}>
          <p>On this page</p>
          <h1 className={"subtitle"}>{element.title}</h1>
        </div>
      </div>
    </div>
  );
};
