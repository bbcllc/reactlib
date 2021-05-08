import { createContext } from "react";
import { IFormContext } from "./formTypes";

const FormContext = createContext<IFormContext>({
  curPageNum: 1,
  pageCount: 1,
  formValues: {},
  pageValues: {},
  goNext: () => undefined,
  goPrev: () => undefined,
});

export default FormContext;
