/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
//@ts-nocheck
import { h, FunctionalComponent } from "preact";
import { useState, useEffect, useRef, useContext } from "preact/hooks";
import BuilderContext from "src/BuilderContext";
import { IconPencil, IconPlus } from "@tabler/icons-react";
import { useAtom } from "jotai";
import {
  currentUserIdAtom,
  currentUserRoleAtom,
  selectedCollectionAtom,
  collectionDocsTriggerAtom,
  isCollectionSwitchingAtom,
} from "src/state/atoms";
import { findUserRole } from "src/ui_components/ui_functions/findUserRole";
import {
  renameCollection,
  addNewCollection,
} from "./ui_functions/collectionHandlers";

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
  const [addingNewCollection, setAddingNewCollection] = useState(false);
  const [currentUserId] = useAtom(currentUserIdAtom);
  const [, setCurentUserRole] = useAtom(currentUserRoleAtom);
  const [selectedCollection, setSelectedCollection]: any = useAtom(
    selectedCollectionAtom
  );
  const [, setCollectionDocsTrigger] = useAtom(collectionDocsTriggerAtom);
  const [, setIsCollectionSwitching] = useAtom(isCollectionSwitchingAtom);
  const { token, setDataForUpdate } = useContext(BuilderContext) || {};

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: any) => {
    setSelectedCollection(option);
    setIsOpen(false);
    onSelect(option || {});
  };

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

  async function createNewCollection(
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
      const data = await addNewCollection(token, e.currentTarget.textContent);
      if (data) {
        setCollectionDocsTrigger((prevTrigger) => prevTrigger + 1);
      }
    }
  }

  const handleRenameEvent = (e) => {
    if (e.type === "keydown" && e.key !== "Enter") return;
    handleDropdownTitleRename(setEditTitle, updateCollections, e);
  };

  let hasAddedCollection = false;

  const handleAddCollectionEvent = (e) => {
    if (hasAddedCollection) return;
    if (e.type !== "keydown" || e.key !== "Enter") return;
    if (!addingNewCollection) return;

    handleDropdownTitleAdd(setEditTitle, createNewCollection, e);
    hasAddedCollection = true;
  };

  useEffect(() => {
    hasAddedCollection = false;
  }, [addingNewCollection]);

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
                onBlur={
                  addingNewCollection
                    ? handleAddCollectionEvent
                    : handleRenameEvent
                }
                onKeyDown={
                  addingNewCollection
                    ? handleAddCollectionEvent
                    : handleRenameEvent
                }
              >
                {selectedCollection.name || "Select an option"}
              </div>
            </div>
          )}
        </button>
        {isOwner && (
          <div className="collection-dropdown-buttons-wrapper">
            <button
              hidden={!rename}
              className={"rename-button"}
              onClick={() => {
                setAddingNewCollection(false);
                setEditTitle(true);
              }}
            >
              <IconPencil />
            </button>
            <button
              hidden={!rename}
              className={"rename-button"}
              onClick={() => {
                setAddingNewCollection(true);
                setEditTitle(true);
                console.log("add new collection");
              }}
            >
              <IconPlus />
            </button>
          </div>
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

function handleDropdownTitleRename(
  setEditTitle,
  updateCollections: (
    e:
      | h.JSX.TargetedFocusEvent<HTMLDivElement>
      | h.JSX.TargetedKeyboardEvent<HTMLDivElement>
  ) => Promise<void>,
  e: h.JSX.TargetedKeyboardEvent<HTMLDivElement>
) {
  window.tempTitle = document.getElementById("dropdown-title").innerText;
  document.getElementById("dropdown-title").innerText = "";
  window.getSelection()?.removeAllRanges();
  setEditTitle(false);
  document.getElementById("dropdown-title").innerText = window.tempTitle;
  updateCollections(e);
}

function handleDropdownTitleAdd(
  setEditTitle,
  createNewCollection: (
    e:
      | h.JSX.TargetedFocusEvent<HTMLDivElement>
      | h.JSX.TargetedKeyboardEvent<HTMLDivElement>
  ) => Promise<void>,
  e: h.JSX.TargetedKeyboardEvent<HTMLDivElement>
) {
  window.tempTitle = document.getElementById("dropdown-title").innerText;
  document.getElementById("dropdown-title").innerText = "";
  window.getSelection()?.removeAllRanges();
  setEditTitle(false);
  document.getElementById("dropdown-title").innerText = window.tempTitle;
  createNewCollection(e);
}
