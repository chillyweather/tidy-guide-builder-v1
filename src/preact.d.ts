import * as preact from "preact";
import { Component as PreactComponent, RenderableProps } from "preact";

declare global {
  namespace React {
    interface Attributes extends preact.Attributes {}
    interface ClassAttributes<T> extends preact.ClassAttributes<T> {}
    interface ComponentClass<P = {}, S = {}>
      extends preact.ComponentClass<P, S> {}
    interface FunctionComponent<P = {}> {} // Removed extension here
    interface Component<P = {}, S = {}> {}
    interface PureComponent<P = {}, S = {}> {}
    interface ReactElement extends preact.VNode {}
    interface ReactNode {}
    interface SFC<P = {}> extends preact.FunctionComponent<P> {}
    interface FC<P = {}> {}
    interface CSSProperties extends preact.JSX.CSSProperties {}
  }
}
