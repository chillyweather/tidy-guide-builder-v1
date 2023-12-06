import { createContext } from "preact";
import { StateUpdater } from "preact/hooks";

interface IContext {
  selectedElement: any;
  setSelectedElement: any;
  selectedSections: any[];
  setSelectedSections: any;
  selectedElementName: string;
}

const BuilderContext = createContext<IContext | null>(null);

export default BuilderContext;
