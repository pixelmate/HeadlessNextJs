export const CloseIcon = ({ ...props }) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 35 35"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      role="img"
      data-icon="x"
      {...props}
    >
      <path d="M8.5,8.5 L26.5,26.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M26.5,8.5 L8.5,26.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};
