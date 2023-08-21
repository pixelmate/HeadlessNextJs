export const SearchIcon = ({ ...props }) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 35 35"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      role="img"
      data-icon="search"
      {...props}
    >
      <path
        d="M4.9,16.8a11.8,11.8 0 1,0 23.6,0a11.8,11.8 0 1,0 -23.6,0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="m25 25 5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M1099 2h1l2 19h-26l2-19h21m0-2h-21l-2 2-2 19c-1 1 0 2 1 2h27l2-2-3-19-2-2z" />
      <path d="M1083 0c0-3 2-6 6-6M1095 0c0-3-3-6-6-6" />
      <path d="M1083 0v6M1095 0v6" />
    </svg>
  );
};
