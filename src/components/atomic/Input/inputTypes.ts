import { ControllerProps } from "react-hook-form";

type InputFieldTypes =
  | "text"
  | "email"
  | "phone"
  | "button"
  | "number"
  | "date"
  | "time"
  | "textarea";

export interface IInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue"> {
  name: string;
  id?: string;
  label?: string;
  type?: InputFieldTypes;
  min?: number;
  placeholder?: string;
  defaultValue?: unknown;
  rules?: ControllerProps["rules"];
}
