export const formatPhoneNumber = <T extends { [key: string]: string | undefined }>(
  formData: T,
  areaCodeKey: keyof T,
  phonePrefixKey: keyof T,
  phoneLineNumberKey: keyof T,
  phoneExtKey?: keyof T
): string => {
  const areaCode = formData?.[areaCodeKey] ?? '';
  const phonePrefix = formData?.[phonePrefixKey] ?? '';
  const phoneLineNumber = formData?.[phoneLineNumberKey] ?? '';
  const phoneExt = phoneExtKey ? formData?.[phoneExtKey] ?? '' : '';

  const formattedPhoneNumber = `${areaCode}-${phonePrefix}-${phoneLineNumber}${
    phoneExt !== '' ? `-${phoneExt}` : ''
  }`;

  return formattedPhoneNumber;
};
