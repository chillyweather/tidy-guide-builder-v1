/* eslint-disable @typescript-eslint/no-explicit-any */
import { h, FunctionalComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { useAtom } from "jotai";
import {
  currentUserIdAtom,
  currentUserRoleAtom,
  selectedCollectionInSettingsAtom,
} from "src/state/atoms";
import { findUserRole } from "src/ui_components/ui_functions/findUserRole";

interface DropdownProps {
  options: any[];
  onSelect: any;
}

const CollectionsInSettingsDropdown: FunctionalComponent<DropdownProps> = ({
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUserId] = useAtom(currentUserIdAtom);
  const [, setCurentUserRole] = useAtom(currentUserRoleAtom);
  const [selectedCollection, setSelectedCollection]: any = useAtom(
    selectedCollectionInSettingsAtom
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: any) => {
    setSelectedCollection(option);
    setIsOpen(false);
    onSelect(option || {});
  };

  useEffect(() => {
    const role = findUserRole(selectedCollection, currentUserId);
    setCurentUserRole(role);
  }, [selectedCollection]);

  return (
    <div class="dropdown-comp">
      <div className="dropdown-wrapper">
        <button
          className="dropdown-toggle"
          onClick={toggleDropdown}
          onBlur={() => setIsOpen(false)}
        >
          {options[0] && (
            <div className={"select-collection-dropdown-title"}>
              <div
                id={"dropdown-title"}
                onBlur={() => {
                  window.getSelection()?.removeAllRanges();
                }}
              >
                {options[0].name || "Select an option"}
              </div>
            </div>
          )}
        </button>
        {isOpen && (
          <div class="dropdown-menu">
            {options.map((option) => {
              const role = findUserRole(option, currentUserId);
              return (
                <div
                  className={"dropdown-item"}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    // if (!isSettingsPageOpen) {
                    //   setDataForUpdate({});
                    // }
                    selectOption(option);
                  }}
                >
                  <div>{option.name}</div>{" "}
                  <span className={"tag " + role}></span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionsInSettingsDropdown;
