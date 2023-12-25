import { createContext } from "preact";

interface IContext {
  selectedElement: any;
  setSelectedElement: any;
  selectedSections: any[];
  setSelectedSections: any;
  selectedElementName: string;
  setSelectedElementName: any;
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
  documentationTitle: string;
  setDocumentationTitle: any;
  isWip: boolean;
  setIsWip: any;
  isBuilding: boolean;
  setIsBuilding: any;
  selectedElementKey: string;
  setSelectedElementKey: any;
  token: string;
  isLoading: boolean;
  setIsLoading: any;
  isScroll: boolean;
  isMainContentOpen: boolean;
  setIsMainContentOpen: any;
  isIndexOpen: boolean;
  setIsIndexOpen: any;
  isFromSavedData: boolean;
  setIsFromSavedData: any;
  isContenFromServerOpen: boolean;
  setIsContenFromServerOpen: any;
  isLoginPageOpen: boolean;
}

const BuilderContext = createContext<IContext | null>(null);

export default BuilderContext;
