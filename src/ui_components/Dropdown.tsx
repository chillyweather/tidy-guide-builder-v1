/* eslint-disable @typescript-eslint/no-explicit-any */
import { h, FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import { useAtom } from "jotai";
import { currentUserIdAtom } from "src/state/atoms";

interface DropdownProps {
  options: any[];
  onSelect: any;
}

const CollectionsDropdown: FunctionalComponent<DropdownProps> = ({
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    options[0].name || "🧨 no collection"
  );
  const [currentUserId] = useAtom(currentUserIdAtom);
  // const [currentUserRole, setCurentUserRole] = useAtom(currentUserIdAtom);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: any) => {
    console.log("option", option);
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
          {options.map((option) => {
            const role = findUserRole(option, currentUserId);
            return (
              <li
                className={"dropdown-item"}
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectOption(option);
                }}
              >
                <div>{option.name}</div> <span className={"tag " + role}></span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CollectionsDropdown;

function findUserRole(collection: any, userId: string) {
  if (!collection || !collection.users) return null;
  if (collection.owner === userId) return "Admin";
  const user = collection.users.find((user: any) => user.user === userId);
  return user ? user.permission : null;
}
