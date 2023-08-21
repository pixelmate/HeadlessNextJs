import {
  PASSWORD_INDICATOR_MULTIPLIER,
  PASSWORD_STRONG_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from 'constants/password';
import { useMemo, useState } from 'react';

const STRENGTH_MESSAGE = [
  '',
  'ChangePassword_WeakPassword',
  'ChangePassword_NormalPassword',
  'ChangePassword_MediumPassword',
  'ChangePassword_StrongPassword',
  'ChangePassword_VeryStrongPassword',
];
const STRENGTH_COLORS = ['transparent', 'danger', 'danger', 'warning', 'warning', 'success'];
const STRENGTH_RULES: RegExp[] = [
  /[a-z]/,
  /[A-Z]/,
  /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/,
  /[0-9]/,
];

export const usePasswordStrength = () => {
  const [strength, setStrength] = useState(0);
  const { color, message, indicatorLength } = useMemo(
    () => ({
      color: STRENGTH_COLORS[strength === 1 ? 0 : strength],
      message: STRENGTH_MESSAGE[strength],
      indicatorLength: strength * PASSWORD_INDICATOR_MULTIPLIER || PASSWORD_INDICATOR_MULTIPLIER,
    }),
    [strength]
  );

  function checkPasswordStrength(value: string): void {
    let strengthLevel = 0;
    value.length > 0 && value.length < PASSWORD_MIN_LENGTH
      ? (strengthLevel = 1)
      : (strengthLevel = 0);

    if (value.length >= PASSWORD_MIN_LENGTH && value.length <= PASSWORD_MAX_LENGTH) {
      STRENGTH_RULES.forEach((rule) => {
        if (rule.test(value)) {
          strengthLevel++;
        }
      });
      if (value.length >= PASSWORD_STRONG_LENGTH && strengthLevel === STRENGTH_RULES.length) {
        strengthLevel++;
      }
    }
    setStrength(strengthLevel);
  }

  return {
    checkPasswordStrength,
    color,
    message,
    indicatorLength,
  };
};
