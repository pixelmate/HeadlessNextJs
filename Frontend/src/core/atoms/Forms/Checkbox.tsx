import React, { InputHTMLAttributes } from 'react';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  name: string;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  ({ className, label, name, error, ...rest }, ref) => {
    return (
      <div>
        <div className={className}>
          <input id={name} name={name} type="checkbox" ref={ref} className="me-2" {...rest} />

          <label htmlFor={name} className="pl-5">
            {label}
          </label>
        </div>

        {error && <p className="my-2 text-xs ltr:text-right rtl:text-left text-red-500">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
