import { h } from "preact";

const RadioButton = ({
  selectedOption,
  setSelectedOption,
}: {
  selectedOption: string;
  setSelectedOption: (prop: string) => void;
}) => {
  const handleChange = (
    event: h.JSX.TargetedEvent<HTMLInputElement, Event>
  ) => {
    setSelectedOption(event.currentTarget.value);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <input
          type="radio"
          id="solid"
          name="lineStyle"
          value="Solid"
          checked={selectedOption === "Solid"}
          onChange={handleChange}
        />
        <label htmlFor="solid" style={{ color: "#323232" }}>
          Solid
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <input
          type="radio"
          id="dash"
          name="lineStyle"
          value="Dash"
          checked={selectedOption === "Dash"}
          onChange={handleChange}
        />
        <label htmlFor="dash" style={{ color: "#323232" }}>
          Dash
        </label>
      </div>
    </div>
  );
};

export default RadioButton;
