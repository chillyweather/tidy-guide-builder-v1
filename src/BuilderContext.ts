import { createContext } from "preact";
import { StateUpdater } from "preact/hooks";

interface IContext {
  selectedElement: any;
  setSelectedElement: StateUpdater<any>;
}

const BuilderContext = createContext<IContext | null>(null);

export default BuilderContext;
