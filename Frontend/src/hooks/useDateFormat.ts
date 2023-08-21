import { useEffect, useState } from 'react';

export const useFormattedDate = (originalDate: string): string => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const dateObject = new Date(originalDate);
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    const formattedDateString = `${month}/${day}/${year}`;
    setFormattedDate(formattedDateString);
  }, [originalDate]);

  return formattedDate;
};
