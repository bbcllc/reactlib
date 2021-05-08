import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import FormContext from './formContext';
import { IFormWizardProps } from './formTypes';

const FormWizard = <FormValues extends FieldValues = Record<string, unknown>>({
  onSubmit,
  paged = false,
  defaultPageNum = 1,
  children,
}: React.PropsWithChildren<
  IFormWizardProps<FormValues>
>): React.ReactElement => {
  // Initialize a `react-hook-form` context
  const methods = useForm<FormValues, FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  // Initialize state for the context
  const [curPageNum, setCurPageNum] = useState(defaultPageNum);
  const [formValues, setFormValues] = useState<Record<string, unknown>>({});

  // Properties

  // Object of values on the current page
  const pageValues = useMemo(() => methods.watch(), [
    methods.watch,
    methods.formState,
  ]);

  // A total count of all of the pages
  const pageCount = useMemo(() => {
    // Set the number of pages to 1 if the form isn't paged
    if (paged === false) return 1;
    else return React.Children.count(children) || 1;
  }, [children, paged]);

  const currentPage = useMemo(() => {
    return paged ? React.Children.toArray(children)[curPageNum - 1] : children;
  }, [children, curPageNum, paged]);

  // If no onSubmit is set, the handler will just console log the data
  onSubmit = useCallback(
    onSubmit ? onSubmit : (data) => console.log('Form onSubmit', data),
    [onSubmit]
  );

  const updateFormValues = useCallback(() => {
    console.log('page', pageValues);
    setFormValues((prev) => ({ ...prev, ...pageValues }));
  }, [setFormValues, pageValues]);

  const goNext = useCallback(async () => {
    updateFormValues();
    setCurPageNum((prev) => (prev < pageCount ? prev + 1 : prev));
  }, [curPageNum, pageValues, formValues, pageCount]);

  const goPrev = useCallback(async () => {
    updateFormValues();
    setCurPageNum((prev) => (prev > 1 ? prev - 1 : prev));
  }, [curPageNum, pageValues, formValues]);

  useEffect(() => console.log({ formValues, pageValues }), [
    formValues,
    pageValues,
  ]);

  return (
    <FormContext.Provider
      value={{
        pageCount,
        curPageNum,
        formValues,
        pageValues,
        goNext,
        goPrev,
      }}
    >
      <FormProvider {...methods}>
        <form
          className="form-wizard-wrapper"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="form-wizard-container">
            {currentPage}
            {paged && (
              <>
                <button type="button" onClick={goPrev}>
                  Prev Page
                </button>
                <button type="button" onClick={goNext}>
                  Next Page
                </button>
              </>
            )}
          </div>
        </form>
      </FormProvider>
    </FormContext.Provider>
  );
};

export default FormWizard;
