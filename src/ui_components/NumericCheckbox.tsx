import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

interface NumericInputProps {
  value: number;
  onChange: (newValue: number) => void;
}

const NumericInput = ({ value, onChange }: NumericInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (
    event: h.JSX.TargetedEvent<HTMLInputElement, Event>
  ) => {
    const newValue = parseFloat(event.currentTarget.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <input
      style={{ width: "80px" }}
      type="number"
      value={inputValue}
      onInput={handleInputChange}
    />
  );
};

export default NumericInput;
