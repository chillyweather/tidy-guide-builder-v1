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
  const [currentUserId] = useAtom(currentUserIdAtom);
  const [, setCurentUserRole] = useAtom(currentUserRoleAtom);
  const [selectedCollection, setSelectedCollection]: any = useAtom(
    selectedCollectionAtom
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: any) => {
    setSelectedCollection(option);
    setIsOpen(false);
    onSelect(option || {});
  };
  //
  //   useEffect(() => {
  //     const userCollections = options.filter(
  //       (collection: any) => collection.owner === currentUserId
  //     );
  //     setSelectedCollection(userCollections[0]);
  //   }, [options]);

  useEffect(() => {
    console.log("selectedCollection", selectedCollection);
    const role = findUserRole(selectedCollection, currentUserId);
    setCurentUserRole(role);
  }, [selectedCollection]);

  return (
    <div class="dropdown-comp">
      <button
        class="dropdown-toggle"
        onClick={toggleDropdown}
        // onBlur={() => setIsOpen(false)}
      >
        {selectedCollection && (
          <div>{selectedCollection.name || "Select an option"}</div>
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
                  selectOption(option);
                }}
              >
                <div>{option.name}</div> <span className={"tag " + role}></span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CollectionsDropdown;
