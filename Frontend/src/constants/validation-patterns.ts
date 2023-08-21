export const USERNAME_PATTERN = /^[a-zA-Z0-9]{1}[a-zA-Z0-9_-]{4,97}[a-zA-Z0-9]{1}$/;
export const EMAIL_VALIDATION = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const EMAIL_VALIDATION_REP = /^(?:\s*|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})$/;
export const PASSWORD_VALIDATION = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,50}$/;
export const PASSWORD_VALIDATION_ORDER_CLOUD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,50}$/;
export const PHONE_VALIDATION = /^[^01]\d{9,}$/;
export const BASKET_COUNT = /^\d+$/;
export const ADDRESS = /^(?![0-9]+$).+/;
export const ONLY_NUMBERS = /^\d*$/;
export const ZIP_CODE = /^[0-9]{5}(?:-[0-9]{4})?$/;
export const GIFT_CERTIFICATE_MESSAGE_VALIDATION =
  /[\w\d\s\.\'\,\-\!\@\#\$\&\*\`\~\[\]\?\"\:\;\\\/\{\}\|\%\^\(\)\+\=]{3,100}/;
export const REDEMPTION_CODE = /^[A-Z0-9]+$/;
export const PROMOCODE = /^[a-zA-Z0-9-]{5,50}$/;
export const EMAIL_VALIDATION_NEWSLETTER = /^(?:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|)$/i;
export const NON_EMPTY_CHARACTER = /^(?!\s*$).+/;
export const DIGIT_REGEX = /^\d+$/;
export const DIGIT_LETTER_NO_SPACE = /^[a-zA-Z0-9]+$/;
