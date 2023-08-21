export const BasketIcon = ({ ...props }) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 35 35"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      role="img"
      data-icon="basket"
      {...props}
    >
      <path
        fill="currentColor"
        d="m28.3 11 .3.2L31 30H4.6L7 11.2l.3-.2h21m0-2h-21c-1.1 0-2.1.9-2.3 2L2.6 30c-.1 1.1.6 2 1.7 2h27c1.1 0 1.9-.9 1.7-2l-2.5-19c-.1-1.1-1.1-2-2.2-2z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M11.7 9a6 6 0 0 1 6-6m6 6a6 6 0 0 0-6-6"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        d="M11.9 9v6m12-6v6"
      />
    </svg>
  );
};
