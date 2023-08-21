import React, { SelectHTMLAttributes } from 'react';
import styles from './Form.module.scss';
import { Control, Controller, FieldValues } from 'react-hook-form';

type SelectOption = {
  key: string;
  value: string;
};

export interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  labelClassName?: string;
  label: string;
  name: string;
  error: string | undefined;
  data: SelectOption[];
  control: Control<FieldValues>;
}

const SelectDropdown = React.forwardRef<HTMLInputElement, Props>(
  ({ className = 'mb-3', labelClassName = '', label, name, error, data, control }) => {
    return (
      <div className={className}>
        <label className={`${styles.label} ${labelClassName} d-block`}>{label}</label>
        <div className="w-100">
          <Controller
            name={name}
            control={control}
            defaultValue="0"
            render={({ field }) => (
              <select
                id={name}
                value={field.value}
                onChange={field.onChange}
                className={`${styles.selectDropdown} bg-white w-100 rounded-1`}
              >
                {data &&
                  data.map((option, index) => {
                    const { key, value } = option;
                    return (
                      <option key={index} value={key}>
                        {value}
                      </option>
                    );
                  })}
              </select>
            )}
          />
          <div>{error && <p className={styles.errors}>{error}</p>}</div>
        </div>
      </div>
    );
  }
);
//To resolve build error - Component definition is missing display name
SelectDropdown.displayName = 'SelectDropdown';
export default SelectDropdown;
