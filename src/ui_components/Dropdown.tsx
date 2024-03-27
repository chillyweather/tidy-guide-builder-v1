import { h, FunctionalComponent } from "preact";
import { useState } from "preact/hooks";

interface DropdownProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const Dropdown: FunctionalComponent<DropdownProps> = ({
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div class="dropdown-comp">
      <button class="dropdown-toggle" onClick={toggleDropdown}>
        {selectedOption || "Select an option"}
      </button>
      {isOpen && (
        <ul class="dropdown-menu">
          {options.map((option) => (
            <li onClick={() => selectOption(option)}>{option}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
