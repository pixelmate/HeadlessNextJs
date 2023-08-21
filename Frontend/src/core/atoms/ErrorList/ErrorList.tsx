import styles from './ErrorList.module.scss';
interface ErrorListProps {
  errors: string[];
  className?: string;
}
const ErrorList = (props: ErrorListProps): JSX.Element => {
  const { errors } = props;

  if (errors?.length > 0) {
    return (
      <div
        className={`${props?.className} border border-danger text-red p-2 ${styles.error_list_wrapper}`}
      >
        <ul className="m-0">
          {errors.map((error, index) => {
            return <li key={`${error}${index}`}>{error}</li>;
          })}
        </ul>
      </div>
    );
  }

  return <></>;
};

export default ErrorList;
