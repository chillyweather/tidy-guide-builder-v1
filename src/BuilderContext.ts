import { createContext } from "preact";

interface IContext {
  selectedElement: any;
  setSelectedElement: any;
  selectedSections: any[];
  setSelectedSections: any;
  selectedElementName: string;
  selectedCard: string;
  setSelectedCard: any;
  loggedInUser: string;
  setLoggedInUser: any;
}

const BuilderContext = createContext<IContext | null>(null);

export default BuilderContext;
