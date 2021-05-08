import { ReactNode } from "react";
import { SubmitHandler } from "react-hook-form";

export interface IFormWizardProps<FormValues = Record<string, unknown>> {
  onSubmit?: SubmitHandler<FormValues>;
  beforeSubmit?: (data: FormValues) => void;
  paged?: boolean;
  defaultPageNum?: number;
}

export interface IFormPageProps {
  title?: ReactNode | undefined;
  subtitle?: ReactNode | undefined;
  description?: ReactNode | undefined;
  footer?: ReactNode | undefined;
}

export interface IFormContext<FormValues = Record<string, unknown>> {
  curPageNum: number;
  pageCount: number;
  pageValues: FormValues;
  formValues: FormValues;
  goNext: () => void;
  goPrev: () => void;
}
