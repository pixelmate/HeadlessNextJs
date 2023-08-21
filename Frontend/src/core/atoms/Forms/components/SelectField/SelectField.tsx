import { SelectHTMLAttributes, forwardRef } from 'react';
import styles from '../../Form.module.scss';
import selectFieldStyles from './SelectField.module.scss';
import { SelectValue } from './SelectField.type';

export interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectValue[];
  className?: string;
  label: string | JSX.Element;
  name: string;
  error: string | undefined;
}

const SelectField = forwardRef<HTMLSelectElement, Props>(
  ({ options = [], className = 'mb-3', label, name, error, ...rest }, ref) => {
    return (
      <div className={`${className} ${selectFieldStyles.select_field}`}>
        <label className={`${styles.label} d-block`}>{label}</label>
        <select
          id={name}
          name={name}
          className={`${styles.textfield} bg-white w-100 rounded-1 form-control px-2 basic-multi-select`}
          ref={ref}
          {...rest}
        >
          <option key={rest.placeholder} value={''}>
            {rest.placeholder}
          </option>
          {options.map((item: SelectValue) => (
            <option key={item.title} value={item.value}>
              {item?.title}
            </option>
          ))}
        </select>
        <div>{error && <p className={styles.errors}>{error}</p>}</div>
      </div>
    );
  }
);
SelectField.displayName = 'SelectField';
export default SelectField;
