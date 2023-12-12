import { useContext, useState } from "preact/hooks";
import BuilderContext from "../../BuilderContext";

const selectedCard = useContext(BuilderContext)?.selectedCard;
const setSelectedCard = useContext(BuilderContext)?.setSelectedCard;
const setSelectedSections = useContext(BuilderContext)?.setSelectedSections;

const handleOpenSection = (e: MouseEvent, id: string) => {
  e.stopPropagation();
  if (selectedCard === id) {
    setSelectedCard("");
  } else {
    setSelectedCard(id);
  }
};

const handleDeleteSection = (e: MouseEvent, index: number) => {
  e.stopPropagation();
  setSelectedSections((prevSections: any[]) => {
    const newSections = Array.from(prevSections);
    newSections.splice(index, 1);
    return newSections;
  });
};

const handleDuplicateSection = (e: MouseEvent, index: number, data: any) => {
  e.stopPropagation();
  setSelectedSections((prevSections: any[]) => {
    const newSections = Array.from(prevSections);
    const newSection = { ...data };
    newSection.id = Math.random().toString(36).substring(2, 9);
    newSections.splice(index + 1, 0, newSection);
    return newSections;
  });
};

export { handleOpenSection, handleDeleteSection, handleDuplicateSection };
