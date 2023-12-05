import { createContext } from "preact";

interface IContext {
  // Define the shape of your context here
  // For now, it's an empty object
}

const BuilderContext = createContext<IContext | null>(null);

export default BuilderContext;
