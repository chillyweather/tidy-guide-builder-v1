/* eslint-disable @typescript-eslint/no-explicit-any */
import { h, FunctionalComponent } from "preact";
import { useState, useEffect, useRef, useContext } from "preact/hooks";
import BuilderContext from "src/BuilderContext";
import { IconEdit } from "@tabler/icons-react";
import { useAtom } from "jotai";
import {
  currentUserIdAtom,
  currentUserRoleAtom,
  selectedCollectionAtom,
  collectionDocsTriggerAtom,
  isCollectionSwitchingAtom,
} from "src/state/atoms";
import { findUserRole } from "src/ui_components/ui_functions/findUserRole";
import { renameCollection } from "./ui_functions/collectionHandlers";

interface DropdownProps {
  rename: boolean;
  options: any[];
  onSelect: any;
}

const CollectionsDropdown: FunctionalComponent<DropdownProps> = ({
  rename,
  options,
  onSelect,
}) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [currentUserId] = useAtom(currentUserIdAtom);
  const [, setCurentUserRole] = useAtom(currentUserRoleAtom);
  const [selectedCollection, setSelectedCollection]: any = useAtom(
    selectedCollectionAtom
  );
  const [, setCollectionDocsTrigger] = useAtom(collectionDocsTriggerAtom);
  const [, setIsCollectionSwitching] = useAtom(isCollectionSwitchingAtom);
  const { token, setDataForUpdate, isSettingsPageOpen } =
    useContext(BuilderContext) || {};

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: any) => {
    setSelectedCollection(option);
    setIsOpen(false);
    onSelect(option || {});
  };

  useEffect(() => {
    console.log("isSettingsPageOpen", isSettingsPageOpen);
  }, [isSettingsPageOpen]);

  useEffect(() => {
    if (selectedCollection) {
      if (currentUserId === selectedCollection.owner) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    }
  }, [selectedCollection]);

  useEffect(() => {
    const role = findUserRole(selectedCollection, currentUserId);
    setCurentUserRole(role);
  }, [selectedCollection]);

  useEffect(() => {
    const element = inputRef.current;
    if (editTitle && isOwner) {
      element?.focus();

      const range = document.createRange();
      range.selectNodeContents(element as Node);

      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    } else {
      element?.blur();
    }
  }, [editTitle, selectedCollection]);

  async function updateCollections(
    e:
      | h.JSX.TargetedFocusEvent<HTMLDivElement>
      | h.JSX.TargetedKeyboardEvent<HTMLDivElement>
  ) {
    if (
      e.currentTarget.textContent &&
      e.currentTarget.textContent !== selectedCollection.name
    ) {
      setSelectedCollection({
        ...selectedCollection,
        name: e.currentTarget.textContent,
      });
      const data = await renameCollection(
        token,
        selectedCollection._id,
        e.currentTarget.textContent
      );
      if (data) {
        setCollectionDocsTrigger((prevTrigger) => prevTrigger + 1);
      }
    }
  }

  return (
    <div class="dropdown-comp">
      <div className="dropdown-wrapper">
        <button
          className="dropdown-toggle"
          onClick={toggleDropdown}
          onBlur={() => setIsOpen(false)}
        >
          {selectedCollection && (
            <div className={"select-collection-dropdown-title"}>
              <div
                id={"dropdown-title"}
                ref={inputRef}
                contentEditable={editTitle}
                onBlur={(e) => {
                  window.getSelection()?.removeAllRanges();
                  setEditTitle(false);
                  updateCollections(e);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setEditTitle(false);
                    e.preventDefault();
                    updateCollections(e);
                  } else if (e.key === " ") {
                    e.stopPropagation();
                  }
                }}
              >
                {selectedCollection.name || "Select an option"}
              </div>
            </div>
          )}
        </button>
        {isOwner && (
          <button
            hidden={!rename}
            className={"rename-button"}
            onClick={() => {
              setEditTitle(true);
            }}
          >
            <IconEdit />
          </button>
        )}
        {isOpen && (
          <div class="dropdown-menu">
            {options.map((option) => {
              const role = findUserRole(option, currentUserId);
              return (
                <div
                  className={"dropdown-item"}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    if (option.name !== selectedCollection.name)
                      setIsCollectionSwitching(true);
                    setDataForUpdate({});
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

export default CollectionsDropdown;
