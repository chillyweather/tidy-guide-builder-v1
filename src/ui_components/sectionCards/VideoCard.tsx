import { h } from "preact";

const VideoCard = ({
  data,
  isSelected,
  setSelectedCard,
}: {
  data: any;
  isSelected: boolean;
  setSelectedCard: Function;
}) => {
  return (
    <div
      className={isSelected ? "sectionCard selected" : "sectionCard"}
      onClick={() => setSelectedCard(data.id)}
    >
      <h1>{data.title}</h1>
    </div>
  );
};

export default VideoCard;
