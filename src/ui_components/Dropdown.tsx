/* eslint-disable @typescript-eslint/no-explicit-any */
import { h, FunctionalComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { useAtom } from "jotai";
import {
  currentUserIdAtom,
  currentUserRoleAtom,
  selectedCollectionAtom,
} from "src/state/atoms";
import { findUserRole } from "src/ui_components/ui_functions/findUserRole";

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
  const [currentUserRole, setCurentUserRole] = useAtom(currentUserRoleAtom);
  const [selectedCollection] = useAtom(selectedCollectionAtom);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: any) => {
    setSelectedOption(option.name);
    setIsOpen(false);
    onSelect(option);
  };

  useEffect(() => {
    console.log("currentUserRole", currentUserRole);
  }, [currentUserRole]);

  useEffect(() => {
    const role = findUserRole(selectedCollection, currentUserId);
    setCurentUserRole(role);
  }, [selectedCollection]);

  // useEffect(() => {
  //   if (options.length > 0 && currentUserId) {
  //     const role = findUserRole(selectOption, currentUserId);
  //     console.log("role", role);
  //     setCurentUserRole(role);
  //   }
  // }, [selectOption]);

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
