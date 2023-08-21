import classNames from 'classnames';

export interface ButtonElement {
  label: string;
  btnType?: string;
}

const Button = (props: ButtonElement): JSX.Element => {
  const { label, btnType = 'primary' } = props;

  return (
    <button
      className={classNames('px-4 py-2  rounded-lg duration-300 transition-all ease-in-out', {
        'bg-gray-200 text-black hover:text-yellow-400': btnType === 'primary',
        'bg-yellow-400 text-white': btnType !== 'primary',
      })}
    >
      {label}
    </button>
  );
};

export default Button;
