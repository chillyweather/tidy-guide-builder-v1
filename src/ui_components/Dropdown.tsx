/* eslint-disable @typescript-eslint/no-explicit-any */
import { h, FunctionalComponent } from "preact";
import { useState } from "preact/hooks";

interface DropdownProps {
  options: any[];
  onSelect: (selectedOption: string) => void;
}

const Dropdown: FunctionalComponent<DropdownProps> = ({
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    options[0].name || "🧨 no collection"
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: any) => {
    setSelectedOption(option.name);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div class="dropdown-comp">
      <button
        class="dropdown-toggle"
        onClick={toggleDropdown}
        onBlur={() => setIsOpen(false)}
      >
        {selectedOption || "Select an option"}
      </button>
      {isOpen && (
        <ul class="dropdown-menu">
          {options.map((option) => (
            <li
              onMouseDown={(e) => {
                e.preventDefault();
                selectOption(option);
              }}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
