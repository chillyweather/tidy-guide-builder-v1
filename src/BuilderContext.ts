/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "preact";

interface IContext {
  currentDocument: string;
  currentPage: string;
  currentUser: any;
  documentationData: any;
  documentationId: string;
  documentationTitle: string;
  isBuilding: boolean;
  isCurrentNameValid: boolean;
  isDraft: boolean;
  isFromSavedData: boolean;
  isLoading: boolean;
  isPdSectionOpen: boolean;
  isPreviewing: boolean;
  isScroll: boolean;
  isWip: boolean;
  loggedInUser: string;
  previewData: any;
  selectedCard: string;
  selectedMasterId: string;
  selectedSections: any[];
  setCurrentDocument: any;
  setCurrentPage: any;
  setCurrentUser: any;
  setDocumentationData: any;
  setDocumentationId: any;
  setDocumentationTitle: any;
  setIsBuilding: any;
  setIsCurrentNameValid: any;
  setIsDraft: any;
  setIsFromSavedData: any;
  setIsLoading: any;
  setIsPdSectionOpen: any;
  setIsPreviewing: any;
  setIsWip: any;
  setLoggedInUser: any;
  setPreviewData: any;
  setSelectedCard: any;
  setSelectedMasterId: any;
  setSelectedSections: any;
  setShowDeleteAccountPopup: any;
  setShowResetPopup: any;
  setToken: any;
  showDeleteAccountPopup: boolean;
  showResetPopup: boolean;
  token: string;
}

const BuilderContext = createContext<IContext | null>(null);

export default BuilderContext;
