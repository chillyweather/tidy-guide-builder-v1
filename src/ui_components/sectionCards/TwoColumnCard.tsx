import { h } from "preact";

const TwoColumnCard = ({
  data,
  leftTitle,
  setLeftTitle,
  leftTextContent,
  setLeftTextContent,
  rightTitle,
  setRightTitle,
  rightTextContent,
  setRightTextContent,
}: {
  data: any;
  leftTitle: string;
  setLeftTitle: Function;
  leftTextContent: string;
  setLeftTextContent: Function;
  rightTitle: string;
  setRightTitle: Function;
  rightTextContent: string;
  setRightTextContent: Function;
}) => {
  return (
    <div className="twoColumnCardBodyContent">
      <div className="oneColumn">
        <input
          className="columnTitle"
          type="text"
          placeholder="Title"
          value={leftTitle}
          onInput={(e) => setLeftTitle(e.currentTarget.value)}
        />
        <textarea
          className="columnTextArea"
          rows={15}
          maxLength={1000}
          placeholder="Type here..."
          value={leftTextContent}
          onInput={(e) => setLeftTextContent(e.currentTarget.value)}
        />
        <div className="textSymbolsCounterRow">
          <div className="textSymbolsCounter">
            {leftTextContent.length}/1000
          </div>
        </div>
      </div>
      <div className="oneColumn">
        <input
          className="columnTitle"
          type="text"
          placeholder="Title"
          value={rightTitle}
          onInput={(e) => setRightTitle(e.currentTarget.value)}
        />
        <textarea
          className="columnTextArea"
          rows={15}
          maxLength={1000}
          placeholder="Type here..."
          value={rightTextContent}
          onInput={(e) => setRightTextContent(e.currentTarget.value)}
        />
        <div className="textSymbolsCounterRow">
          <div className="textSymbolsCounter">
            {rightTextContent.length}/1000
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoColumnCard;
