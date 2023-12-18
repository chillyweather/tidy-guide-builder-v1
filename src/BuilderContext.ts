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
  currentUser: any;
  setCurrentUser: any;
  currentDocument: string;
  setCurrentDocument: any;
  currentPage: string;
  setCurrentPage: any;
  documentationData: any;
  setDocumentationData: any;
}

const BuilderContext = createContext<IContext | null>(null);

export default BuilderContext;
