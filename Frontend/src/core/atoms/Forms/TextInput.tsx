import React, { InputHTMLAttributes } from 'react';
import styles from './Form.module.scss';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  maxLength?: number;
  placeholder?: string;
  label?: string | JSX.Element;
  name: string;
  error?: string | JSX.Element | undefined;
  type?: string;
  disabled?: boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className = 'mb-3',
      labelClassName = '',
      errorClassName = '',
      maxLength,
      label,
      name,
      error,
      placeholder = '',
      type = 'text',
      disabled,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const inputClassName = `${styles.textfield} ${
      disabled ? 'bg-light' : 'bg-white'
    } w-100 rounded-1 form-control`;

    return (
      <div className={className}>
        <label className={`${styles.label} ${labelClassName} d-block`}>{label}</label>
        <div className="w-100">
          {/* No class should be added to this container.
          Reason - This is to create a two grid form structure where label comes on left and field on right.
          Till now the forms (Login, Change Password, and Change Username) had layouts where field was below the label.
          */}
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            className={inputClassName}
            ref={ref}
            maxLength={maxLength}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            onBlur={onBlur}
            {...rest}
          />
          <div>{error && <p className={`${styles.errors} ${errorClassName}`}>{error}</p>}</div>
        </div>
      </div>
    );
  }
);

// To resolve build error - Component definition is missing display name
TextInput.displayName = 'TextInput';
export default TextInput;
