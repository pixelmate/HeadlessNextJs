import AutoshipOrderSummaryComponent, {
  type AutoshipOrderSummaryProps,
} from 'core/molecules/AutoshipOrderSummaryComponent';

const AutoshipOrderSummary = (props: AutoshipOrderSummaryProps): JSX.Element => {
  return <AutoshipOrderSummaryComponent {...props} />;
};

export default AutoshipOrderSummary;
