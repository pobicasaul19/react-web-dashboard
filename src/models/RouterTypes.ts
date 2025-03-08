export interface routerType {
  path: string;
  element: JSX.Element;
  children?: {
    path: string;
    element: JSX.Element;
  }[]
}