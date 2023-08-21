import { DEFAULT_DATE_FORMAT } from 'constants/format';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
const formatDate = (date?: string, format?: string) =>
  dayjs.utc(date || undefined).format(format || DEFAULT_DATE_FORMAT);

export default formatDate;
