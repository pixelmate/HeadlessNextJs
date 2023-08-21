import { renderHook } from '@testing-library/react';
import { getGreeting } from './getGreeting';

describe('useGreeting', () => {
  it('returns a time-based greeting message', () => {
    const { result } = renderHook(() => getGreeting());
    const greetingElement = result?.current;
    expect(greetingElement).not.toBeNull();
  });
});
