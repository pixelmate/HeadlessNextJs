import { act, renderHook } from '@testing-library/react';
import { usePasswordStrength } from './usePasswordStrength';
import { PASSWORD_INDICATOR_MULTIPLIER } from 'constants/password';

describe('usePasswordStrength', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any;
  beforeEach(() => {
    result = renderHook(() => usePasswordStrength()).result;
  });
  it('Password not entered', () => {
    expect(result.current.indicatorLength).toBe(PASSWORD_INDICATOR_MULTIPLIER);
    expect(result.current.message).toBe('ChangePassword_WeakPassword');
    expect(result.current.color).toBe('transparent');
  });

  it('Weak password', () => {
    act(() => {
      result.current.checkPasswordStrength('123456');
    });
    expect(result.current.indicatorLength).toBe(PASSWORD_INDICATOR_MULTIPLIER);
    expect(result.current.message).toBe('ChangePassword_WeakPassword');
    expect(result.current.color).toBe('danger');
  });

  it('Normal password', () => {
    act(() => {
      result.current.checkPasswordStrength('123456s');
    });
    expect(result.current.indicatorLength).toBe(PASSWORD_INDICATOR_MULTIPLIER * 2);
    expect(result.current.message).toBe('ChangePassword_NormalPassword');
    expect(result.current.color).toBe('danger');
  });

  it('Medium password', () => {
    act(() => {
      result.current.checkPasswordStrength('123456sS');
    });
    expect(result.current.indicatorLength).toBe(PASSWORD_INDICATOR_MULTIPLIER * 3);
    expect(result.current.message).toBe('ChangePassword_MediumPassword');
    expect(result.current.color).toBe('warning');
  });

  it('Strong password', () => {
    act(() => {
      result.current.checkPasswordStrength('1234sS@');
    });
    expect(result.current.indicatorLength).toBe(PASSWORD_INDICATOR_MULTIPLIER * 4);
    expect(result.current.message).toBe('ChangePassword_StrongPassword');
    expect(result.current.color).toBe('warning');
  });

  it('Very strong password', () => {
    act(() => {
      result.current.checkPasswordStrength('12345sS@');
    });
    expect(result.current.indicatorLength).toBe(PASSWORD_INDICATOR_MULTIPLIER * 5);
    expect(result.current.message).toBe('ChangePassword_VeryStrongPassword');
    expect(result.current.color).toBe('success');
  });
});
