import { createContext } from "preact";
import { StateUpdater } from "preact/hooks";

interface IContext {
  //
}

const CardContext = createContext<IContext | null>(null);

export default CardContext;
