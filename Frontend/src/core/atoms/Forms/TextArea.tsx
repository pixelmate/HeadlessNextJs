import React, { TextareaHTMLAttributes } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { MESSAGE_CHARACTER_COUNT } from 'constants/query-config';
import styles from './Form.module.scss';

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  labelClassName?: string;
  label?: string;
  name: string;
  error?: string | undefined;
  control: Control<FieldValues>;
  maxLimit?: number;
  defaultValue?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      className = 'mb-3',
      labelClassName = '',
      label,
      name,
      error,
      control,
      maxLimit,
      defaultValue,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const maxLength: number = maxLimit ? maxLimit : MESSAGE_CHARACTER_COUNT;
    return (
      <div className={className}>
        <label className={`${styles.label} ${labelClassName} d-block`}>{label}</label>
        <div className="w-100">
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || ''}
            render={({ field }) => (
              <>
                <textarea
                  id={name}
                  name={name}
                  className={`${styles.textArea} bg-white w-100 rounded-1 form-control`}
                  ref={ref}
                  maxLength={maxLength}
                  onChange={(e) => field.onChange(e.target.value)}
                  value={field.value}
                  onBlur={onBlur}
                  {...rest}
                ></textarea>
                <p className={`${styles.charactersLeft} mt-1`}>
                  {maxLength - field.value.length} characters left
                </p>
                <div>{error && <p className={styles.errors}>{error}</p>}</div>
              </>
            )}
          />
        </div>
      </div>
    );
  }
);

// To resolve build error - Component definition is missing display name
TextArea.displayName = 'TextArea';
export default TextArea;
