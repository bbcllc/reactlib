import React from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { _INPUT_PHONE_MASK } from './inputMasks';
import { IInputProps } from './inputTypes';

// TODO add a textarea conditional render

const Input = ({
  label,
  type = 'text',
  name,
  id = name,
  placeholder,
  rules = {},
  defaultValue,
  ...inputProps
}: IInputProps): React.ReactElement => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="input-field">
      <div className="input-wrapper">
        {label && <label htmlFor={id}>{label}</label>}
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field: { value, ...field } }) => {
            return type === 'date' ? (
              <DatePicker
                placeholderText={placeholder}
                {...field}
                selected={value}
              />
            ) : type === 'time' ? (
              <DatePicker
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText={placeholder}
                selected={value}
                {...field}
              />
            ) : type === 'phone' ? (
              <InputMask
                id={id}
                type={type}
                mask={_INPUT_PHONE_MASK}
                value={value}
                {...inputProps}
                {...field}
              />
            ) : (
              <input
                id={id}
                type={type}
                value={value}
                {...inputProps}
                {...field}
              />
            );
          }}
        />
      </div>
      {errors[name] && (
        <div className="input-error">{errors[name].message}</div>
      )}
    </div>
  );
};

export default Input;
